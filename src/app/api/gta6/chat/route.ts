import { NextResponse, type NextRequest } from "next/server";
import { claimOnce, clientIp, hashToCounts, redis, redisUnconfigured } from "@/lib/gta6Redis";

export const dynamic = "force-dynamic";

const LIST_KEY = "gta6:chat";
const PIN_KEY = "gta6:chat:pin";
const MAX_STORED = 200;
const MAX_RETURNED = 60;
const MAX_NAME = 20;
const MAX_TEXT = 280;
const COOLDOWN_SECONDS = 8;
const REACTIONS = ["🔥", "😂", "💀", "❤️"];

type Message = { id: string; name: string; text: string; at: number; admin?: true };

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

function isAdmin(request: NextRequest) {
  const adminKey = process.env.GTA6_CHAT_ADMIN_KEY;
  return Boolean(adminKey) && request.headers.get("x-admin-key") === adminKey;
}

const notSetUp = () => NextResponse.json({ error: "Chat isn't set up yet." }, { status: 503 });
const unavailable = () => NextResponse.json({ error: "Chat is unavailable right now." }, { status: 503 });

export async function GET() {
  if (redisUnconfigured) return notSetUp();
  try {
    const [list, pin] = await redis([["LRANGE", LIST_KEY, 0, MAX_RETURNED - 1], ["GET", PIN_KEY]]);
    const messages = (list as string[]).map((raw) => JSON.parse(raw) as Message);
    const reactionHashes = messages.length
      ? await redis(messages.map((m) => ["HGETALL", `gta6:chat:react:${m.id}`]))
      : [];
    return NextResponse.json({
      pinned: pin ?? null,
      reactions: REACTIONS,
      messages: messages.map((m, i) => ({ ...m, reactions: hashToCounts(reactionHashes[i]) })),
    });
  } catch {
    return unavailable();
  }
}

export async function POST(request: NextRequest) {
  if (redisUnconfigured) return notSetUp();
  let body: { name?: unknown; text?: unknown; website?: unknown; react?: unknown; id?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const ip = clientIp(request);

  if (body.react !== undefined) {
    const emoji = String(body.react);
    const id = String(body.id ?? "");
    if (!REACTIONS.includes(emoji) || !id) return NextResponse.json({ error: "Invalid reaction." }, { status: 400 });
    try {
      if (await claimOnce(request, `react:${id}:${emoji}`)) {
        await redis([["HINCRBY", `gta6:chat:react:${id}`, emoji, 1]]);
      }
      return NextResponse.json({ ok: true });
    } catch {
      return unavailable();
    }
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
    const [claimed] = await redis([["SET", `gta6:cooldown:${ip}`, 1, "EX", COOLDOWN_SECONDS, "NX"]]);
    if (claimed !== "OK") {
      return NextResponse.json(
        { error: `Slow down. You can post every ${COOLDOWN_SECONDS} seconds.` },
        { status: 429 },
      );
    }
    const message: Message = { id: crypto.randomUUID(), name, text, at: Date.now() };
    if (isAdmin(request)) message.admin = true;
    await redis([["LPUSH", LIST_KEY, JSON.stringify(message)], ["LTRIM", LIST_KEY, 0, MAX_STORED - 1]]);
    return NextResponse.json({ message });
  } catch {
    return unavailable();
  }
}

// Admin only: set or clear the pinned message.
export async function PUT(request: NextRequest) {
  if (!isAdmin(request)) return NextResponse.json({ error: "Not allowed." }, { status: 401 });
  const body = (await request.json().catch(() => ({}))) as { pin?: unknown };
  const pin = clean(body.pin, MAX_TEXT);
  await redis([pin ? ["SET", PIN_KEY, pin] : ["DEL", PIN_KEY]]);
  return NextResponse.json({ pinned: pin || null });
}

export async function DELETE(request: NextRequest) {
  if (!isAdmin(request)) return NextResponse.json({ error: "Not allowed." }, { status: 401 });
  const id = request.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id." }, { status: 400 });
  const [all] = await redis([["LRANGE", LIST_KEY, 0, -1]]);
  const raw = (all as string[]).find((entry) => (JSON.parse(entry) as Message).id === id);
  if (!raw) return NextResponse.json({ removed: false });
  await redis([["LREM", LIST_KEY, 0, raw], ["DEL", `gta6:chat:react:${id}`]]);
  return NextResponse.json({ removed: true });
}
