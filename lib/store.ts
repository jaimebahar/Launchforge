import "server-only";
import { mkdir, readFile, writeFile, rename } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import type { Inquiry, InquiryInput } from "./validation";
const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
export const persistent = Boolean(url && key);
async function remote(path: string, init?: RequestInit) {
  if (!persistent) throw new Error("Storage is not configured");
  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: key!,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
    cache: "no-store",
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) {
    if (
      response.status === 429 ||
      (await response.text()).includes("rate_limit")
    )
      throw new Error("rate_limit");
    throw new Error("Storage unavailable");
  }
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}
type Local = {
  inquiries: Inquiry[];
  attempts: { hash: string; at: number; kind: string }[];
};
let queue: Promise<unknown> = Promise.resolve();
async function local<T>(action: (data: Local) => T): Promise<T> {
  if (process.env.NODE_ENV === "production")
    throw new Error("Configure Supabase for production");
  const operation = queue.then(async () => {
    await mkdir(".local", { recursive: true });
    let data: Local;
    try {
      data = JSON.parse(await readFile(".local/inquiries.json", "utf8"));
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code !== "ENOENT") throw e;
      data = { inquiries: [], attempts: [] };
    }
    data.attempts = data.attempts.filter((a) => a.at > Date.now() - 3600000);
    const result = action(data);
    await writeFile(".local/inquiries.tmp", JSON.stringify(data), {
      mode: 0o600,
    });
    await rename(".local/inquiries.tmp", ".local/inquiries.json");
    return result;
  });
  queue = operation.catch(() => {});
  return operation;
}
export async function rateLimit(
  hash: string,
  kind: "contact" | "login",
  limit: number,
) {
  if (persistent) {
    const allowed = await remote("rpc/consume_attempt", {
      method: "POST",
      body: JSON.stringify({ p_hash: hash, p_kind: kind, p_limit: limit }),
    });
    if (!allowed) throw new Error("rate_limit");
  } else
    await local((data) => {
      if (
        data.attempts.filter((a) => a.hash === hash && a.kind === kind)
          .length >= limit
      )
        throw new Error("rate_limit");
      data.attempts.push({ hash, kind, at: Date.now() });
    });
}
export async function createInquiry(input: InquiryInput) {
  const { website, consent, ...fields } = input;
  void website;
  void consent;
  const inquiry: Inquiry = {
    ...fields,
    id: randomUUID(),
    created_at: new Date().toISOString(),
    status: "new",
  };
  if (persistent)
    await remote("inquiries", {
      method: "POST",
      body: JSON.stringify(inquiry),
    });
  else await local((data) => data.inquiries.unshift(inquiry));
  return inquiry.id;
}
export async function listInquiries(): Promise<Inquiry[]> {
  return persistent
    ? remote("inquiries?select=*&order=created_at.desc&limit=500")
    : local((data) => data.inquiries.slice(0, 500));
}
export async function updateInquiry(id: string, status: Inquiry["status"]) {
  if (persistent) {
    const rows = await remote(
      `inquiries?id=eq.${encodeURIComponent(id)}&select=id`,
      {
        method: "PATCH",
        headers: { Prefer: "return=representation" },
        body: JSON.stringify({ status }),
      },
    );
    return rows.length > 0;
  }
  return local((data) => {
    const row = data.inquiries.find((i) => i.id === id);
    if (!row) return false;
    row.status = status;
    return true;
  });
}
