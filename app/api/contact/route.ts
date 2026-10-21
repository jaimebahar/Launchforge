import { NextResponse } from "next/server";
import { inquirySchema } from "@/lib/validation";
import { createInquiry, rateLimit } from "@/lib/store";
import { sameOrigin, clientHash } from "@/lib/auth";
export const runtime = "nodejs";
export async function POST(request: Request) {
  if (!sameOrigin(request))
    return NextResponse.json(
      { error: "Request origin is not allowed." },
      { status: 403 },
    );
  try {
    const body = await request.text();
    if (body.length > 16000)
      return NextResponse.json(
        { error: "Your message is too large." },
        { status: 413 },
      );
    let parsed;
    try {
      parsed = inquirySchema.safeParse(JSON.parse(body));
    } catch {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }
    if (!parsed.success)
      return NextResponse.json(
        {
          error:
            "Please check your details. Messages must be 20–4,000 characters.",
        },
        { status: 400 },
      );
    await rateLimit(clientHash(request), "contact", 5);
    const id = await createInquiry(parsed.data);
    return NextResponse.json(
      {
        id,
        message:
          "Your inquiry is in. Our team will review your project and get back to you.",
      },
      { status: 201 },
    );
  } catch (error) {
    const limited = error instanceof Error && error.message === "rate_limit";
    return NextResponse.json(
      {
        error: limited
          ? "Too many inquiries. Please try again in an hour."
          : "We couldn’t save your inquiry. Please try again later.",
      },
      { status: limited ? 429 : 503 },
    );
  }
}
