import { NextResponse } from "next/server";
import { isAdmin, sameOrigin } from "@/lib/auth";
import { updateInquiry } from "@/lib/store";
import { z } from "zod";
export async function PATCH(request: Request) {
  if (!sameOrigin(request) || !(await isAdmin()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const text = await request.text();
    if (text.length > 1000)
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    const parsed = z
      .object({ id: z.uuid(), status: z.enum(["new", "contacted", "closed"]) })
      .safeParse(JSON.parse(text));
    if (!parsed.success)
      return NextResponse.json({ error: "Invalid update" }, { status: 400 });
    if (!(await updateInquiry(parsed.data.id, parsed.data.status)))
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Could not update inquiry" },
      { status: 503 },
    );
  }
}
