import { NextResponse, type NextRequest } from "next/server";
import { claimOnce, hashToCounts, redis, redisUnconfigured } from "@/lib/gta6Redis";

export const dynamic = "force-dynamic";

const QUESTIONS = [
  { id: "servers", question: "Will PSN or Xbox Live go down on launch night?", options: ["Absolutely", "Nah, they're ready"] },
  { id: "favorite", question: "Who's your favorite protagonist?", options: ["Jason", "Lucia", "Both. Ride or die."] },
  { id: "finish", question: "How long until you finish the story?", options: ["Under a week", "About a month", "I live in Leonida now"] },
  { id: "sick", question: "Calling in sick on November 19?", options: ["Already did", "Thinking about it", "No, I'm responsible"] },
];

export async function GET() {
  if (redisUnconfigured) return NextResponse.json({ error: "Not set up yet." }, { status: 503 });
  try {
    const hashes = await redis(QUESTIONS.map((q) => ["HGETALL", `gta6:poll:${q.id}`]));
    return NextResponse.json({
      questions: QUESTIONS.map((q, i) => {
        const counts = hashToCounts(hashes[i]);
        return { ...q, counts: q.options.map((_, j) => counts[String(j)] ?? 0) };
      }),
    });
  } catch {
    return NextResponse.json({ error: "Unavailable right now." }, { status: 503 });
  }
}

export async function POST(request: NextRequest) {
  if (redisUnconfigured) return NextResponse.json({ error: "Not set up yet." }, { status: 503 });
  const body = (await request.json().catch(() => ({}))) as { id?: unknown; option?: unknown };
  const question = QUESTIONS.find((q) => q.id === body.id);
  const option = Number(body.option);
  if (!question || !Number.isInteger(option) || option < 0 || option >= question.options.length) {
    return NextResponse.json({ error: "Invalid vote." }, { status: 400 });
  }
  try {
    const counted = await claimOnce(request, `poll:${question.id}`, option);
    if (counted) await redis([["HINCRBY", `gta6:poll:${question.id}`, String(option), 1]]);
    return NextResponse.json({ counted });
  } catch {
    return NextResponse.json({ error: "Unavailable right now." }, { status: 503 });
  }
}
