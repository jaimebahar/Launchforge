import { NextResponse } from "next/server";
import { clientHash, cookieName, equal, sameOrigin, session } from "@/lib/auth";
import { rateLimit } from "@/lib/store";
export async function POST(request: Request) {
  if (!sameOrigin(request))
    return NextResponse.json(
      { error: "Request origin is not allowed." },
      { status: 403 },
    );
  try {
    const text = await request.text();
    if (text.length > 2000)
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    const body = JSON.parse(text);
    if (!process.env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD.length < 16)
      return NextResponse.json(
        { error: "Dashboard access is not configured." },
        { status: 503 },
      );
    await rateLimit(clientHash(request), "login", 10);
    if (
      typeof body.password !== "string" ||
      !equal(body.password, process.env.ADMIN_PASSWORD)
    )
      return NextResponse.json(
        { error: "Incorrect password." },
        { status: 401 },
      );
    const response = NextResponse.json({ ok: true });
    response.cookies.set(cookieName, session(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 8 * 3600,
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error && error.message === "rate_limit"
            ? "Too many attempts. Try again in an hour."
            : "Sign-in is temporarily unavailable.",
      },
      {
        status:
          error instanceof Error && error.message === "rate_limit" ? 429 : 503,
      },
    );
  }
}
