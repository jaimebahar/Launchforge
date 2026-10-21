import { test } from "node:test";
import assert from "node:assert/strict";
const base = process.env.TEST_BASE_URL || "http://localhost:3000";
const headers = { "Content-Type": "application/json", Origin: base };
const inquiry = {
  name: "Test Founder",
  email: "founder@example.com",
  company: "Workflow Test",
  service: "Growth Launch",
  message:
    "We are building a new business and need help launching our website.",
  consent: true,
  website: "",
};
async function post(path, body, extra = {}) {
  return fetch(base + path, {
    method: "POST",
    headers: { ...headers, ...extra },
    body: JSON.stringify(body),
  });
}
test("complete contact and private dashboard workflow", async () => {
  let r = await fetch(base + "/");
  assert.equal(r.status, 200);
  assert.match(await r.text(), /what if/);
  for (const path of [
    "/services",
    "/pricing",
    "/contact",
    "/privacy",
    "/dashboard",
  ]) {
    r = await fetch(base + path);
    assert.equal(r.status, 200, path);
  }
  r = await post("/api/contact", { ...inquiry, message: "short" });
  assert.equal(r.status, 400);
  r = await post("/api/contact", { ...inquiry, website: "spam.example" });
  assert.equal(r.status, 400);
  r = await post("/api/contact", inquiry, { Origin: "https://evil.example" });
  assert.equal(r.status, 403);
  r = await post("/api/contact", inquiry);
  assert.equal(r.status, 201);
  const { id } = await r.json();
  assert.ok(id);
  r = await fetch(base + "/api/admin/inquiries", {
    method: "PATCH",
    headers,
    body: JSON.stringify({ id, status: "closed" }),
  });
  assert.equal(r.status, 401);
  r = await post("/api/admin/login", { password: "wrong-password" });
  assert.equal(r.status, 401);
  assert.ok(process.env.ADMIN_PASSWORD, "ADMIN_PASSWORD must be set");
  r = await post("/api/admin/login", { password: process.env.ADMIN_PASSWORD });
  assert.equal(r.status, 200);
  const cookie = r.headers.get("set-cookie").split(";")[0];
  assert.match(r.headers.get("set-cookie"), /HttpOnly/i);
  assert.match(r.headers.get("set-cookie"), /SameSite=strict/i);
  r = await fetch(base + "/dashboard", {
    headers: { Cookie: cookie + "tampered" },
  });
  assert.doesNotMatch(await r.text(), /Workflow Test/);
  r = await fetch(base + "/dashboard", { headers: { Cookie: cookie } });
  const dashboard = await r.text();
  assert.match(dashboard, /Test Founder/);
  assert.match(dashboard, /Workflow Test/);
  r = await fetch(base + "/api/admin/inquiries", {
    method: "PATCH",
    headers: { ...headers, Cookie: cookie },
    body: JSON.stringify({ id, status: "invalid" }),
  });
  assert.equal(r.status, 400);
  r = await fetch(base + "/api/admin/inquiries", {
    method: "PATCH",
    headers: { ...headers, Cookie: cookie },
    body: JSON.stringify({ id, status: "contacted" }),
  });
  assert.equal(r.status, 200);
  r = await fetch(base + "/dashboard", { headers: { Cookie: cookie } });
  assert.match(await r.text(), /contacted/);
  r = await post("/api/admin/logout", {}, { Cookie: cookie });
  assert.equal(r.status, 200);
  assert.match(
    r.headers.get("set-cookie"),
    /Max-Age=0|Expires=Thu, 01 Jan 1970/i,
  );
  r = await fetch(base + "/dashboard");
  const loggedOut = await r.text();
  assert.match(loggedOut, /Admin password/);
  assert.doesNotMatch(loggedOut, /Workflow Test/);
  for (let i = 0; i < 4; i++) {
    r = await post("/api/contact", inquiry);
    assert.equal(r.status, 201);
  }
  r = await post("/api/contact", inquiry);
  assert.equal(r.status, 429);
});
