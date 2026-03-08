import { NextResponse } from "next/server";

const WINDOWS_RELEASE_URL =
  "https://github.com/mwierciak/Pentad_Public/releases/tag/v1.0.0";

export async function GET() {
  return NextResponse.redirect(WINDOWS_RELEASE_URL, 307);
}
