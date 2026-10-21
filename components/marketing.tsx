import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Compass,
  Fingerprint,
  PanelsTopLeft,
  Rocket,
  Target,
  Lightbulb,
  Sparkles,
} from "lucide-react";
export const plans = [
  {
    name: "Launch Essentials",
    price: 99,
    tag: "The first step, made simple.",
    features: [
      "Business idea discovery session",
      "Lean business roadmap",
      "Launch readiness checklist",
      "One round of feedback",
    ],
    note: "For founders finding their direction.",
  },
  {
    name: "Growth Launch",
    price: 299,
    tag: "Your idea. A real foundation.",
    features: [
      "Everything in Launch Essentials",
      "Brand direction & visual moodboard",
      "One-page website design & build",
      "Go-to-market action plan",
      "Two rounds of feedback",
    ],
    note: "For founders ready to make their move.",
  },
  {
    name: "Full Launch",
    price: 599,
    tag: "A complete start-to-launch toolkit.",
    features: [
      "Everything in Growth Launch",
      "Website with up to 5 pages",
      "Core messaging & website copy",
      "Launch campaign planning",
      "30 days of post-launch support",
    ],
    note: "For businesses ready for the spotlight.",
  },
];
export function PricingCards() {
  return (
    <div className="pricing-grid">
      {plans.map((p, i) => (
        <article
          className={`price-card ${i === 1 ? "featured" : ""}`}
          key={p.name}
        >
          {i === 1 && <span className="popular">THE FOUNDER FAVORITE</span>}
          <span className="plan-number">0{i + 1} /</span>
          <h3>{p.name}</h3>
          <p>{p.tag}</p>
          <div className="price">
            ${p.price}
            <span> / one-time</span>
          </div>
          <Link
            href={`/contact?plan=${encodeURIComponent(p.name)}`}
            className={`button ${i === 1 ? "" : "secondary"}`}
          >
            Choose {p.name.split(" ")[0]} <ArrowUpRight size={17} />
          </Link>
          <div className="price-divider" />
          <ul>
            {p.features.map((f) => (
              <li key={f}>
                <Check size={16} />
                {f}
              </li>
            ))}
          </ul>
          <p className="plan-note">{p.note}</p>
        </article>
      ))}
    </div>
  );
}
export const services = [
  {
    icon: Compass,
    title: "Business strategy",
    text: "Find your focus. Validate your idea, define your audience, and build a practical roadmap.",
    label: "CLARITY BEFORE COMPLEXITY",
  },
  {
    icon: Fingerprint,
    title: "Brand & identity",
    text: "Look the part from day one. A distinctive identity and a message your customers remember.",
    label: "MAKE YOUR FIRST IMPRESSION COUNT",
  },
  {
    icon: PanelsTopLeft,
    title: "Website & digital",
    text: "Give your business a home. Fast, thoughtful websites designed to turn interest into action.",
    label: "BUILT TO CONNECT & CONVERT",
  },
  {
    icon: Rocket,
    title: "Launch & growth",
    text: "Go live with a plan. Get the direction and support to launch confidently and keep moving.",
    label: "YOUR NEXT CHAPTER STARTS HERE",
  },
];
export function ServiceCards() {
  return (
    <div className="service-grid">
      {services.map((s, i) => (
        <Link href="/services" className="service-card" key={s.title}>
          <div className="service-top">
            <span className="icon-box">
              <s.icon size={25} />
            </span>
            <span className="card-index">0{i + 1}</span>
          </div>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
          <div className="service-bottom">
            <span>{s.label}</span>
            <ArrowUpRight size={19} />
          </div>
        </Link>
      ))}
    </div>
  );
}
export function CTA() {
  return (
    <section className="container cta-section">
      <div className="cta-orbit" aria-hidden="true" />
      <div>
        <span className="eyebrow">YOUR NEXT CHAPTER</span>
        <h2>
          That idea isn’t going
          <br />
          to launch itself.
        </h2>
        <p>
          Let’s turn the business you’ve been thinking about
          <br className="desktop-break" /> into the business you’re building.
        </p>
      </div>
      <Link href="/contact" className="button light">
        Let’s make it happen <ArrowUpRight size={18} />
      </Link>
    </section>
  );
}
export function LaunchGraphic() {
  return (
    <div
      className="launch-graphic"
      aria-label="An illustration of a business moving from idea to launch"
    >
      <div className="graphic-grid" />
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="orbit orbit-three" />
      <div className="orbit-axis" />
      <span className="star star-one">+</span>
      <span className="star star-two">+</span>
      <div className="rocket-core">
        <Rocket size={93} strokeWidth={1.1} />
        <div className="rocket-trail" />
      </div>
      <div className="float-card idea-card">
        <span className="mini-icon">
          <Lightbulb size={19} />
        </span>
        <div>
          <small>THE BEGINNING</small>
          <strong>One big idea.</strong>
        </div>
        <span className="mini-check">
          <Check size={13} />
        </span>
      </div>
      <div className="float-card launch-card">
        <span className="mini-icon green">
          <Target size={19} />
        </span>
        <div>
          <small>THE NEXT CHAPTER</small>
          <strong>Ready for takeoff.</strong>
        </div>
        <span className="live-dot" />
      </div>
      <div className="graphic-label">
        <span className="live-dot" /> YOUR AMBITION. OUR BLUEPRINT.
      </div>
      <span className="coordinate">KS — 001 / BUILT TO BEGIN</span>
      <div className="sparkle-mark">
        <Sparkles size={20} />
      </div>
    </div>
  );
}
