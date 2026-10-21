import Link from "next/link";
export default function NotFound() {
  return (
    <section className="container page-hero">
      <span className="eyebrow">404 / A SMALL DETOUR</span>
      <h1>
        This page hasn’t
        <br />
        <span className="gradient-text">launched yet.</span>
      </h1>
      <p>Let’s get you back to the beginning.</p>
      <Link className="button" href="/">
        Back to home ↗
      </Link>
    </section>
  );
}
