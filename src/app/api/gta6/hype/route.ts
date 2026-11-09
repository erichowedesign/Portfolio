import { NextResponse, type NextRequest } from "next/server";
import { claimOnce, redis, redisUnconfigured } from "@/lib/gta6Redis";

export const dynamic = "force-dynamic";

const COUNT_KEY = "gta6:hype";

export async function GET() {
  if (redisUnconfigured) return NextResponse.json({ error: "Not set up yet." }, { status: 503 });
  try {
    const [count] = await redis([["GET", COUNT_KEY]]);
    return NextResponse.json({ count: Number(count ?? 0) });
  } catch {
    return NextResponse.json({ error: "Unavailable right now." }, { status: 503 });
  }
}

export async function POST(request: NextRequest) {
  if (redisUnconfigured) return NextResponse.json({ error: "Not set up yet." }, { status: 503 });
  try {
    const counted = await claimOnce(request, "hype");
    const [count] = counted ? await redis([["INCR", COUNT_KEY]]) : await redis([["GET", COUNT_KEY]]);
    return NextResponse.json({ count: Number(count ?? 0), counted });
  } catch {
    return NextResponse.json({ error: "Unavailable right now." }, { status: 503 });
  }
}
