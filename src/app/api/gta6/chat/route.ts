import { NextResponse, type NextRequest } from "next/server";

export const dynamic = "force-dynamic";

const LIST_KEY = "gta6:chat";
const MAX_STORED = 200;
const MAX_RETURNED = 60;
const MAX_NAME = 20;
const MAX_TEXT = 280;
const COOLDOWN_SECONDS = 8;

type Message = { id: string; name: string; text: string; at: number };

const BLOCKED = [
  "fuck", "shit", "bitch", "cunt", "nigger", "nigga", "faggot", "fag", "retard",
  "whore", "slut", "dick", "pussy", "cock", "kike", "spic", "chink", "tranny",
];
const blockedPattern = new RegExp(`(${BLOCKED.join("|")})`, "gi");

function clean(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u001f\u007f\u200b-\u200f\u202a-\u202e]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function censor(value: string) {
  return value.replace(blockedPattern, (word) => word[0] + "*".repeat(word.length - 1));
}

function clientIp(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
}

// Upstash Redis over REST. Vercel's Upstash integration sets the KV_* names.
const redisUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

async function redis(commands: (string | number)[][]): Promise<unknown[]> {
  const res = await fetch(`${redisUrl}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${redisToken}`, "Content-Type": "application/json" },
    body: JSON.stringify(commands),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Redis error ${res.status}`);
  const data = (await res.json()) as { result?: unknown; error?: string }[];
  return data.map((entry) => {
    if (entry.error) throw new Error(entry.error);
    return entry.result;
  });
}

// Local dev fallback when Redis isn't configured. Not shared across serverless instances.
const memory: { list: string[]; cooldowns: Map<string, number> } = { list: [], cooldowns: new Map() };

const store = {
  async latest(): Promise<string[]> {
    if (!redisUrl) return memory.list.slice(0, MAX_RETURNED);
    const [list] = await redis([["LRANGE", LIST_KEY, 0, MAX_RETURNED - 1]]);
    return list as string[];
  },
  async claimCooldown(ip: string): Promise<boolean> {
    if (!redisUrl) {
      const until = memory.cooldowns.get(ip) ?? 0;
      if (until > Date.now()) return false;
      memory.cooldowns.set(ip, Date.now() + COOLDOWN_SECONDS * 1000);
      return true;
    }
    const [ok] = await redis([["SET", `gta6:cooldown:${ip}`, 1, "EX", COOLDOWN_SECONDS, "NX"]]);
    return ok === "OK";
  },
  async push(raw: string) {
    if (!redisUrl) {
      memory.list.unshift(raw);
      memory.list.length = Math.min(memory.list.length, MAX_STORED);
      return;
    }
    await redis([["LPUSH", LIST_KEY, raw], ["LTRIM", LIST_KEY, 0, MAX_STORED - 1]]);
  },
  async remove(id: string) {
    const all = redisUrl
      ? ((await redis([["LRANGE", LIST_KEY, 0, -1]]))[0] as string[])
      : memory.list;
    const raw = all.find((entry) => (JSON.parse(entry) as Message).id === id);
    if (!raw) return false;
    if (redisUrl) await redis([["LREM", LIST_KEY, 0, raw]]);
    else memory.list = memory.list.filter((entry) => entry !== raw);
    return true;
  },
};

const unconfigured = !redisUrl && process.env.NODE_ENV === "production";

export async function GET() {
  if (unconfigured) return NextResponse.json({ error: "Chat isn't set up yet." }, { status: 503 });
  try {
    const messages = (await store.latest()).map((raw) => JSON.parse(raw) as Message);
    return NextResponse.json({ messages });
  } catch {
    return NextResponse.json({ error: "Chat is unavailable right now." }, { status: 503 });
  }
}

export async function POST(request: NextRequest) {
  if (unconfigured) return NextResponse.json({ error: "Chat isn't set up yet." }, { status: 503 });
  let body: { name?: unknown; text?: unknown; website?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Hidden form field that only bots fill in.
  if (body.website) return NextResponse.json({ ok: true });

  const name = censor(clean(body.name, MAX_NAME)) || "Anonymous";
  const text = censor(clean(body.text, MAX_TEXT));
  if (!text) return NextResponse.json({ error: "Say something first." }, { status: 400 });
  if (/https?:\/\/|www\./i.test(text)) {
    return NextResponse.json({ error: "Links aren't allowed." }, { status: 400 });
  }

  try {
    if (!(await store.claimCooldown(clientIp(request)))) {
      return NextResponse.json(
        { error: `Slow down. You can post every ${COOLDOWN_SECONDS} seconds.` },
        { status: 429 },
      );
    }
    const message: Message = { id: crypto.randomUUID(), name, text, at: Date.now() };
    await store.push(JSON.stringify(message));
    return NextResponse.json({ message });
  } catch {
    return NextResponse.json({ error: "Chat is unavailable right now." }, { status: 503 });
  }
}

export async function DELETE(request: NextRequest) {
  const adminKey = process.env.GTA6_CHAT_ADMIN_KEY;
  if (!adminKey || request.headers.get("x-admin-key") !== adminKey) {
    return NextResponse.json({ error: "Not allowed." }, { status: 401 });
  }
  const id = request.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id." }, { status: 400 });
  const removed = await store.remove(id);
  return NextResponse.json({ removed });
}
