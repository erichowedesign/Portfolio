import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const ALLOWED = new Set(["01.png", "02.png", "03.png", "04.png"]);
const DARK = /^dark-(0[1-4]\.png)$/;

type Params = { params: Promise<{ project: string; file: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { project, file } = await params;
  const darkFile = DARK.exec(file)?.[1];
  if (project !== "material-library" || (!ALLOWED.has(file) && !darkFile)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const filePath = path.join(
    process.cwd(),
    "private/nike",
    project,
    darkFile ? "dark" : "",
    darkFile ?? file,
  );
  const body = await readFile(filePath);
  return new NextResponse(new Uint8Array(body), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "private, no-store",
    },
  });
}
