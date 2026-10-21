import { NextResponse } from "next/server";
import { cookieName, sameOrigin } from "@/lib/auth";
export async function POST(request: Request) {
  if (!sameOrigin(request)) return new NextResponse(null, { status: 403 });
  const response = NextResponse.json({ ok: true });
  response.cookies.delete(cookieName);
  return response;
}
