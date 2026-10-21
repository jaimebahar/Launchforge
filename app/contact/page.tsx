import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { Check, MessageSquare, ArrowDownRight } from "lucide-react";
export const metadata: Metadata = { title: "Contact" };
export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const { plan } = await searchParams;
  const selected = [
    "Launch Essentials",
    "Growth Launch",
    "Full Launch",
  ].includes(plan || "")
    ? plan!
    : "Not sure yet";
  return (
    <section className="container contact-page">
      <div className="contact-intro">
        <span className="eyebrow">IT STARTS WITH A CONVERSATION</span>
        <h1>
          Big idea?
          <br />
          <span className="gradient-text">Let’s talk.</span>
        </h1>
        <p>
          You don’t need to have it all figured out.
          <br />
          That’s what we’re here for.
        </p>
        <div className="contact-points">
          <span>
            <Check size={17} /> Tell us where you are today
          </span>
          <span>
            <Check size={17} /> We’ll help map out what’s next
          </span>
          <span>
            <Check size={17} /> Choose your next step with confidence
          </span>
        </div>
        <div className="contact-note">
          <MessageSquare size={23} />
          <p>
            Every great business starts with a small conversation. This is
            yours.
          </p>
          <ArrowDownRight size={24} />
        </div>
      </div>
      <ContactForm plan={selected} />
    </section>
  );
}
