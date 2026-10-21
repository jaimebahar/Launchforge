import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  Sparkles,
  MoveUpRight,
} from "lucide-react";
import {
  CTA,
  LaunchGraphic,
  PricingCards,
  ServiceCards,
} from "@/components/marketing";
export default function Home() {
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <div className="hero-badge">
            <span className="live-dot" /> BUILT FOR THE BOLD. DESIGNED FOR DAY
            ONE.
          </div>
          <h1>
            From <span className="quote">“what if”</span>
            <br />
            to <span className="gradient-text">what’s next.</span>
          </h1>
          <p>
            You bring the ambition. We bring the blueprint.
            <br className="desktop-break" /> LaunchForge helps turn your
            business idea into a<br className="desktop-break" /> brand, a
            presence, and a confident first step.
          </p>
          <div className="hero-actions">
            <Link href="/contact" className="button">
              Build your next big thing <ArrowUpRight size={19} />
            </Link>
            <Link href="/services" className="text-link">
              Explore our services <ArrowRight size={17} />
            </Link>
          </div>
          <div className="hero-assurance">
            <span>
              <Check size={14} /> Clear, one-time pricing
            </span>
            <span>
              <Check size={14} /> Built around your vision
            </span>
          </div>
        </div>
        <LaunchGraphic />
      </section>
      <section className="belief-strip">
        <div className="container belief-inner">
          <span>
            FOR THE PEOPLE
            <br />
            <strong>BUILDING WHAT’S NEXT.</strong>
          </span>
          <div>
            <Sparkles />
            First-time founders
          </div>
          <div>
            <MoveUpRight />
            Ambitious entrepreneurs
          </div>
          <div>
            <span className="tiny-square" />
            Growing businesses
          </div>
        </div>
      </section>
      <section className="container section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">01 / WHAT WE DO</span>
            <h2>
              Big ambition.
              <br />
              Meet your unfair advantage.
            </h2>
          </div>
          <div className="heading-aside">
            <p>
              Everything you need to move from a good idea
              <br className="desktop-break" /> to a business the world can see.
            </p>
            <Link href="/services" className="text-link">
              Meet your launch team <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
        <ServiceCards />
      </section>
      <section className="process-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">02 / HOW IT WORKS</span>
              <h2>
                Less overthinking.
                <br />
                More launching.
              </h2>
            </div>
            <p className="heading-aside">
              A clear path forward, from the first conversation
              <br className="desktop-break" /> to your first big milestone.
            </p>
          </div>
          <div className="steps">
            {[
              {
                title: "Tell us your vision",
                text: "Big idea or back-of-a-napkin thought? We’ll help you find the direction.",
              },
              {
                title: "We build the blueprint",
                text: "A focused plan, the right tools, and a brand that feels like you.",
              },
              {
                title: "Launch with confidence",
                text: "Go live with everything in place and a clear plan for what comes next.",
              },
            ].map((s, i) => (
              <div className="step" key={s.title}>
                <div className="step-line">
                  <span>0{i + 1}</span>
                  <ArrowUpRight size={22} />
                </div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="container section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">03 / SIMPLE, HONEST PRICING</span>
            <h2>
              Your launch. Your pace.
              <br />
              No surprises.
            </h2>
          </div>
          <p className="heading-aside">
            One-time investments. Clearly defined deliverables.
            <br className="desktop-break" /> Choose the starting point that’s
            right for you.
          </p>
        </div>
        <PricingCards />
        <p className="pricing-footnote">
          No retainers. No long-term commitment. Just a stronger start.{" "}
          <Link href="/contact">
            Have a question? Let’s talk <ArrowUpRight size={13} />
          </Link>
        </p>
      </section>
      <CTA />
    </>
  );
}
