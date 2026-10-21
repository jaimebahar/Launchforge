"use client";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import {
  ArrowUpRight,
  LockKeyhole,
  Search,
  LogOut,
  Inbox,
  Mail,
  RefreshCw,
  Check,
  X,
} from "lucide-react";
import type { Inquiry } from "@/lib/validation";
export function LoginForm() {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  async function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: new FormData(e.currentTarget).get("password"),
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not sign in.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="container login-page">
      <form onSubmit={login} className="login-card">
        <span className="icon-box">
          <LockKeyhole size={24} />
        </span>
        <span className="eyebrow">LAUNCHFORGE / TEAM ACCESS</span>
        <h1>Your launch HQ.</h1>
        <p>Sign in to manage customer inquiries.</p>
        <label>
          Admin password
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            maxLength={256}
          />
        </label>
        {error && (
          <p role="alert" className="error-message">
            {error}
          </p>
        )}
        <button className="button" disabled={busy}>
          {busy ? "Signing in…" : "Sign in to dashboard"}
          <ArrowUpRight size={17} />
        </button>
        <small>
          This dashboard is private. Customer inquiries are never publicly
          accessible.
        </small>
      </form>
    </section>
  );
}
export function Dashboard({
  initial,
  storageError,
}: {
  initial: Inquiry[];
  storageError: boolean;
}) {
  const [rows, setRows] = useState(initial);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState("");
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const router = useRouter();
  async function update(id: string, status: Inquiry["status"]) {
    setBusy(id);
    setError("");
    try {
      const response = await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!response.ok) throw new Error((await response.json()).error);
      setRows(rows.map((r) => (r.id === id ? { ...r, status } : r)));
      if (selected?.id === id) setSelected({ ...selected, status });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not update inquiry.");
    } finally {
      setBusy("");
    }
  }
  async function logout() {
    setError("");
    try {
      const response = await fetch("/api/admin/logout", { method: "POST" });
      if (!response.ok) throw new Error();
      router.refresh();
    } catch {
      setError("Could not sign out. Please try again.");
    }
  }
  const visible = rows.filter(
    (r) =>
      (filter === "all" || r.status === filter) &&
      `${r.name} ${r.company} ${r.email} ${r.message} ${r.service}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  return (
    <section className="container dashboard-page">
      <div className="dashboard-heading">
        <div>
          <span className="eyebrow">LAUNCHFORGE / WORKSPACE</span>
          <h1>
            Customer inquiries<span className="blue">.</span>
          </h1>
          <p>A good conversation is the beginning of a great launch.</p>
        </div>
        <button className="button secondary small" onClick={logout}>
          <LogOut size={16} /> Sign out
        </button>
      </div>
      {storageError && (
        <div className="error-message" role="alert">
          Inquiry storage is unavailable. Check your Supabase configuration and
          try refreshing.
        </div>
      )}
      <div className="stat-grid">
        {[
          ["Total inquiries", rows.length],
          ["New", rows.filter((r) => r.status === "new").length],
          ["Contacted", rows.filter((r) => r.status === "contacted").length],
          ["Closed", rows.filter((r) => r.status === "closed").length],
        ].map(([label, count]) => (
          <div className="stat" key={label}>
            <span>{label}</span>
            <strong>{count}</strong>
            <span className="stat-mark">
              <ArrowUpRight size={20} />
            </span>
          </div>
        ))}
      </div>
      <div className="inbox-panel">
        <div className="inbox-toolbar">
          <div
            className="filter-tabs"
            role="group"
            aria-label="Filter inquiries"
          >
            {["all", "new", "contacted", "closed"].map((f) => (
              <button
                key={f}
                aria-pressed={filter === f}
                className={filter === f ? "active" : ""}
                onClick={() => setFilter(f)}
              >
                {f === "all" ? "All inquiries" : f}
              </button>
            ))}
          </div>
          <label className="search-box">
            <Search size={16} />
            <input
              aria-label="Search inquiries"
              placeholder="Search inquiries…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <button
            className="icon-button"
            aria-label="Refresh inquiries"
            onClick={() => window.location.reload()}
          >
            <RefreshCw size={16} />
          </button>
        </div>
        {error && (
          <p className="error-message" role="alert">
            {error}
          </p>
        )}
        {visible.length === 0 ? (
          <div className="empty-inbox">
            <Inbox size={40} />
            <h2>
              {rows.length
                ? "No matching inquiries"
                : "Your next big project starts here."}
            </h2>
            <p>
              {rows.length
                ? "Try another search or status filter."
                : "New contact form submissions will appear in your inbox."}
            </p>
          </div>
        ) : (
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Package</th>
                  <th>Received</th>
                  <th>Status</th>
                  <th>
                    <span className="sr-only">Details</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {visible.map((r) => (
                  <tr key={r.id}>
                    <td>
                      <button
                        className="customer-name"
                        onClick={() => setSelected(r)}
                      >
                        <span className="avatar">
                          {r.name.charAt(0).toUpperCase()}
                        </span>
                        <span>
                          <strong>{r.name}</strong>
                          <small>{r.company || r.email}</small>
                        </span>
                      </button>
                    </td>
                    <td>{r.service}</td>
                    <td>
                      {new Date(r.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        timeZone: "UTC",
                      })}
                    </td>
                    <td>
                      <label className="sr-only" htmlFor={`status-${r.id}`}>
                        Status for {r.name}
                      </label>
                      <select
                        id={`status-${r.id}`}
                        className={`status ${r.status}`}
                        value={r.status}
                        disabled={busy === r.id}
                        onChange={(e) =>
                          update(r.id, e.target.value as Inquiry["status"])
                        }
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td>
                      <button
                        className="icon-button"
                        aria-label={`View inquiry from ${r.name}`}
                        onClick={() => setSelected(r)}
                      >
                        <ArrowUpRight size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="inbox-bottom">
          Showing {visible.length} of {rows.length} inquiries{" "}
          <span>Latest 500 inquiries · dates in UTC</span>
        </div>
      </div>
      {selected && (
        <div className="inquiry-detail">
          <div className="detail-heading">
            <span className="eyebrow">INQUIRY / {selected.id.slice(0, 8)}</span>
            <button
              className="icon-button"
              onClick={() => setSelected(null)}
              aria-label="Close inquiry details"
            >
              <X size={20} />
            </button>
          </div>
          <h2>{selected.name}</h2>
          <p>
            {selected.company} · {selected.service}
          </p>
          <a className="text-link" href={`mailto:${selected.email}`}>
            <Mail size={16} />
            {selected.email}
          </a>
          <div className="inquiry-message">{selected.message}</div>
          <a
            className="button small"
            href={`mailto:${selected.email}?subject=${encodeURIComponent("Your LaunchForge inquiry")}`}
          >
            Reply by email <ArrowUpRight size={17} />
          </a>
          <button
            className="button secondary small"
            disabled={busy === selected.id}
            onClick={() => update(selected.id, "contacted")}
          >
            <Check size={16} /> Mark contacted
          </button>
        </div>
      )}
    </section>
  );
}
