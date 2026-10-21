"use client";
import { FormEvent, useState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
export function ContactForm({ plan }: { plan: string }) {
  const [state, setState] = useState<"idle" | "sending" | "success">("idle");
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setState("sending");
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...Object.fromEntries(form),
          consent: form.get("consent") === "on",
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setReference(data.id.slice(0, 8));
      setState("success");
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Something went wrong. Please try again.",
      );
      setState("idle");
    }
  }
  if (state === "success")
    return (
      <div className="success-panel" role="status">
        <CheckCircle2 size={45} />
        <h2>You’re on the launchpad.</h2>
        <p>
          Your inquiry has been saved. Our team will review your project and
          follow up at the email you provided.
        </p>
        <span className="eyebrow">REFERENCE / {reference}</span>
        <button className="button secondary" onClick={() => setState("idle")}>
          Send another inquiry <ArrowUpRight size={16} />
        </button>
      </div>
    );
  return (
    <form onSubmit={submit} className="contact-form">
      <div className="form-heading">
        <h2>Let’s hear your idea.</h2>
        <p>Give us the big picture. We’ll help with the next step.</p>
      </div>
      <div className="form-row">
        <label>
          Your name <span>*</span>
          <input
            autoComplete="name"
            name="name"
            placeholder="Alex Morgan"
            required
            minLength={2}
            maxLength={100}
          />
        </label>
        <label>
          Email address <span>*</span>
          <input
            autoComplete="email"
            name="email"
            type="email"
            placeholder="alex@yourbusiness.com"
            required
            maxLength={254}
          />
        </label>
      </div>
      <label>
        Business name <span className="optional">(optional)</span>
        <input
          name="company"
          autoComplete="organization"
          placeholder="Your next big thing"
          maxLength={150}
        />
      </label>
      <label>
        Where would you like to start? <span>*</span>
        <select name="service" defaultValue={plan} required>
          {[
            "Not sure yet",
            "Launch Essentials",
            "Growth Launch",
            "Full Launch",
          ].map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </label>
      <label>
        Tell us about your project <span>*</span>
        <textarea
          name="message"
          placeholder="What are you building, and where could you use a hand?"
          required
          minLength={20}
          maxLength={4000}
          rows={5}
        />
        <small>A little context goes a long way. 20–4,000 characters.</small>
      </label>
      <div className="honeypot" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className="checkbox-label">
        <input type="checkbox" name="consent" required />
        <span>
          I agree to the <Link href="/privacy">privacy policy</Link> and to
          being contacted about my inquiry.
        </span>
      </label>
      {error && (
        <p role="alert" className="error-message">
          {error}
        </p>
      )}
      <button className="button" disabled={state === "sending"}>
        {state === "sending"
          ? "Sending your inquiry…"
          : "Let’s build something great"}
        <ArrowUpRight size={18} />
      </button>
      <p className="form-note">
        No pressure. No payment. Just a conversation about what’s next.
      </p>
    </form>
  );
}
