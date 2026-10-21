import "server-only";
import { createHmac, timingSafeEqual, createHash } from "node:crypto";
import { cookies } from "next/headers";
export const cookieName = "launchforge_admin";
function secret() {
  const value = process.env.SESSION_SECRET;
  if (!value || value.length < 32)
    throw new Error("Set SESSION_SECRET to at least 32 characters");
  return value;
}
export function equal(a: string, b: string) {
  return timingSafeEqual(
    createHash("sha256").update(a).digest(),
    createHash("sha256").update(b).digest(),
  );
}
export function session() {
  const payload = String(Date.now() + 8 * 3600000);
  return `${payload}.${createHmac("sha256", secret()).update(payload).digest("hex")}`;
}
export async function isAdmin() {
  try {
    const token = (await cookies()).get(cookieName)?.value;
    if (!token) return false;
    const [expiry, sig] = token.split(".");
    return (
      Number(expiry) > Date.now() &&
      Number(expiry) < Date.now() + 9 * 3600000 &&
      equal(
        sig || "",
        createHmac("sha256", secret()).update(expiry).digest("hex"),
      )
    );
  } catch {
    return false;
  }
}
export function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  const protocol = process.env.VERCEL
    ? "https:"
    : new URL(request.url).protocol;
  return Boolean(origin && host && origin === `${protocol}//${host}`);
}
export function clientHash(request: Request) {
  const ip = process.env.VERCEL
    ? request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown"
    : "local";
  return createHmac("sha256", secret()).update(ip).digest("hex");
}
