import type { Metadata } from "next";
import { CTA, PricingCards } from "@/components/marketing";
export const metadata: Metadata = { title: "Pricing" };
export default function Pricing() {
  return (
    <>
      <section className="container page-hero">
        <span className="eyebrow">A STRONG START. A CLEAR PRICE.</span>
        <h1>
          Small investment.
          <br />
          <span className="gradient-text">Big first step.</span>
        </h1>
        <p>
          Three focused packages. One-time pricing.
          <br />
          Pick your starting point and let’s build something that matters.
        </p>
      </section>
      <section className="container pricing-page">
        <PricingCards />
        <p className="pricing-footnote">
          Prices in USD. Scope and timeline are agreed before work begins. No
          payment is collected on this website.
        </p>
      </section>
      <section className="container faq-section">
        <span className="eyebrow">GOOD QUESTIONS. CLEAR ANSWERS.</span>
        <h2>Before we get started.</h2>
        {[
          [
            "How does getting started work?",
            "Choose a package and send an inquiry. We’ll discuss your goals, confirm the deliverables and timeline, and agree on the project before any work or payment.",
          ],
          [
            "Are these subscriptions?",
            "No. All three packages are one-time services. Domains, hosting upgrades, and other third-party costs are outside the package price and are discussed before you commit.",
          ],
          [
            "How long will my launch take?",
            "Timing depends on the package, your content, and project requirements. We’ll agree on milestones during discovery; no timeline is promised before we understand your project.",
          ],
          [
            "What if I’m not sure which package I need?",
            "Choose “Not sure yet” in the contact form. Tell us where you are and what you want to achieve, and we’ll help you choose a sensible starting point.",
          ],
          [
            "What does post-launch support include?",
            "Full Launch includes 30 days of guidance and fixes related to the agreed website scope after handoff. New features, ongoing marketing, and third-party service fees are not included.",
          ],
        ].map(([q, a]) => (
          <details key={q}>
            <summary>
              {q}
              <span>+</span>
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </section>
      <CTA />
    </>
  );
}
