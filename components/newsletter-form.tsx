"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";

export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setStatus("sending");
    const form = event.currentTarget;
    const payload = new FormData(form);
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: payload.get("email"),
          optIn: payload.get("optIn") === "on",
          website: payload.get("website") || "",
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to subscribe.");
      setStatus("success");
      form.reset();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Please try again.");
      setStatus("idle");
    }
  }
  return (
    <section className="container newsletter-section" aria-labelledby="newsletter-title">
      <div>
        <span className="eyebrow">THE LAUNCHFORGE LETTER</span>
        <h2 id="newsletter-title">Make your next move.</h2>
        <p>Get occasional business-launch tips, useful resources, and LaunchForge updates. No spam.</p>
      </div>
      {status === "success" ? (
        <p className="newsletter-success" role="status">You’re subscribed! Look out for occasional LaunchForge updates.</p>
      ) : (
        <form onSubmit={submit} className="newsletter-form">
          <div className="newsletter-fields">
            <label className="newsletter-email">
              <span>Email address</span>
              <input name="email" type="email" autoComplete="email" placeholder="you@example.com" maxLength={254} required />
            </label>
            <button className="button" type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Signing up…" : "Subscribe"}
            </button>
          </div>
          <label className="newsletter-checkbox">
            <input type="checkbox" name="optIn" required />
            <span>Yes, send me promotional emails and business tips from LaunchForge. I can unsubscribe anytime.</span>
          </label>
          <div className="honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
          <p className="newsletter-note">We respect your inbox. See our <Link href="/privacy">privacy policy</Link>.</p>
          {error && <p className="error-message" role="alert">{error}</p>}
        </form>
      )}
    </section>
  );
}
