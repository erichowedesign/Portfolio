import type { NextRequest } from "next/server";

type Command = (string | number)[];

// Upstash Redis over REST. Vercel's Upstash integration sets the KV_* names.
const redisUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

export const redisUnconfigured = !redisUrl && process.env.NODE_ENV === "production";

export function clientIp(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
}

const PER_IP_CAP = 25;

/**
 * Claims a one-time action (a hype, a vote, a reaction) for this browser.
 * Browsers send a random x-visitor-id so people sharing an IP (carrier NAT, office Wi-Fi) each count,
 * and each IP is capped so one person can't farm counts by clearing storage.
 */
export async function claimOnce(request: NextRequest, action: string, value: string | number = 1) {
  const visitor = request.headers.get("x-visitor-id") ?? "";
  const ip = clientIp(request);
  const who = /^[a-f0-9-]{36}$/i.test(visitor) ? `v:${visitor}` : `ip:${ip}`;
  const [claimed] = await redis([["SET", `gta6:claim:${action}:${who}`, value, "NX"]]);
  if (claimed !== "OK") return false;
  const [used] = await redis([["INCR", `gta6:ipcap:${action.split(":")[0]}:${ip}`]]);
  return Number(used) <= PER_IP_CAP;
}

export async function redis(commands: Command[]): Promise<unknown[]> {
  if (!redisUrl) return commands.map(runInMemory);
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

// Local dev stand-in for the handful of commands these routes use. Not shared across serverless instances.
const mem = new Map<string, { value: unknown; expires?: number }>();

function read<T>(key: string): T | undefined {
  const entry = mem.get(key);
  if (!entry) return undefined;
  if (entry.expires && entry.expires < Date.now()) {
    mem.delete(key);
    return undefined;
  }
  return entry.value as T;
}

function runInMemory([name, key, ...args]: Command): unknown {
  const k = String(key);
  switch (String(name).toUpperCase()) {
    case "GET":
      return read<string>(k) ?? null;
    case "SET": {
      const nx = args.includes("NX");
      const exIndex = args.indexOf("EX");
      if (nx && read(k) !== undefined) return null;
      const expires = exIndex >= 0 ? Date.now() + Number(args[exIndex + 1]) * 1000 : undefined;
      mem.set(k, { value: String(args[0]), expires });
      return "OK";
    }
    case "DEL":
      return mem.delete(k) ? 1 : 0;
    case "INCR": {
      const next = Number(read<string>(k) ?? 0) + 1;
      mem.set(k, { value: String(next) });
      return next;
    }
    case "LPUSH": {
      const list = read<string[]>(k) ?? [];
      list.unshift(...args.map(String).reverse());
      mem.set(k, { value: list });
      return list.length;
    }
    case "LRANGE": {
      const list = read<string[]>(k) ?? [];
      const stop = Number(args[1]);
      return list.slice(Number(args[0]), stop < 0 ? list.length + stop + 1 : stop + 1);
    }
    case "LTRIM": {
      const list = read<string[]>(k) ?? [];
      mem.set(k, { value: list.slice(Number(args[0]), Number(args[1]) + 1) });
      return "OK";
    }
    case "LREM": {
      const list = read<string[]>(k) ?? [];
      const kept = list.filter((v) => v !== String(args[1]));
      mem.set(k, { value: kept });
      return list.length - kept.length;
    }
    case "HINCRBY": {
      const hash = read<Record<string, number>>(k) ?? {};
      hash[String(args[0])] = (hash[String(args[0])] ?? 0) + Number(args[1]);
      mem.set(k, { value: hash });
      return hash[String(args[0])];
    }
    case "HGETALL": {
      const hash = read<Record<string, number>>(k) ?? {};
      return Object.entries(hash).flatMap(([f, v]) => [f, String(v)]);
    }
    default:
      throw new Error(`Unsupported in-memory command ${name}`);
  }
}

export function hashToCounts(flat: unknown): Record<string, number> {
  const counts: Record<string, number> = {};
  const list = (flat as string[] | null) ?? [];
  for (let i = 0; i < list.length; i += 2) counts[list[i]] = Number(list[i + 1]);
  return counts;
}
