import { NextResponse } from "next/server";
import { z } from "zod";
import { createInquiry, rateLimit } from "@/lib/store";
import { sameOrigin, clientHash } from "@/lib/auth";

export const runtime = "nodejs";
const schema = z.object({
  email: z.email().max(254),
  optIn: z.literal(true),
  website: z.string().max(0).default(""),
});

export async function POST(request: Request) {
  if (!sameOrigin(request)) {
    return NextResponse.json({ error: "Request origin is not allowed." }, { status: 403 });
  }
  try {
    const body = await request.text();
    if (body.length > 2048) return NextResponse.json({ error: "Request too large." }, { status: 413 });
    const parsed = schema.safeParse(JSON.parse(body));
    if (!parsed.success) return NextResponse.json({ error: "Please enter a valid email and agree to receive updates." }, { status: 400 });
    await rateLimit(clientHash(request), "contact", 5);
    // Store in the existing inquiry system to avoid new infrastructure costs.
    // Explicitly label records so they are never mistaken for sales leads.
    await createInquiry({
      name: "Newsletter subscriber",
      email: parsed.data.email,
      company: "",
      service: "Not sure yet",
      message: "[NEWSLETTER OPT-IN] Requested LaunchForge promotional emails and business-launch tips.",
      website: "",
      consent: true,
    });
    return NextResponse.json({ message: "Subscribed successfully." }, { status: 201 });
  } catch (error) {
    const limited = error instanceof Error && error.message === "rate_limit";
    return NextResponse.json({
      error: limited ? "Too many attempts. Please try again later." : "Unable to save your subscription. Please try again later.",
    }, { status: limited ? 429 : 503 });
  }
}
