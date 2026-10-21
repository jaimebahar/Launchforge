import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { services, CTA } from "@/components/marketing";
export const metadata: Metadata = { title: "Services" };
const details = [
  [
    "Idea discovery and audience definition",
    "Lean business roadmap",
    "Launch readiness and next steps",
  ],
  [
    "Visual moodboard and brand direction",
    "Core positioning and messaging",
    "Consistent digital presentation",
  ],
  [
    "Responsive website design and development",
    "Accessible, mobile-friendly layouts",
    "Contact forms and deployment handoff",
  ],
  [
    "Practical go-to-market action plan",
    "Launch campaign planning",
    "Post-launch guidance with Full Launch",
  ],
];
export default function Services() {
  return (
    <>
      <section className="container page-hero">
        <span className="eyebrow">WHAT WE BRING TO THE TABLE</span>
        <h1>
          Your vision.
          <br />
          <span className="gradient-text">Our building blocks.</span>
        </h1>
        <p>
          From the first spark to the first customer conversation.
          <br />
          Focused support for the moments that move a business forward.
        </p>
      </section>
      <section className="container service-details">
        {services.map((s, i) => (
          <article key={s.title}>
            <div className="detail-icon">
              <s.icon size={36} />
              <span>0{i + 1}</span>
            </div>
            <div>
              <span className="eyebrow">{s.label}</span>
              <h2>{s.title}</h2>
              <p>{s.text}</p>
              <ul>
                {details[i].map((d) => (
                  <li key={d}>
                    <Check size={16} />
                    {d}
                  </li>
                ))}
              </ul>
              <Link href="/pricing" className="text-link">
                Find your package <ArrowUpRight size={16} />
              </Link>
            </div>
          </article>
        ))}
      </section>
      <CTA />
    </>
  );
}
