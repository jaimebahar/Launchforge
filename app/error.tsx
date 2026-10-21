"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="container page-hero">
      <span className="eyebrow">LET’S TRY THAT AGAIN</span>
      <h1>A small interruption.</h1>
      <p>We couldn’t load this page. Please try again.</p>
      <button className="button" onClick={reset}>
        Try again
      </button>
    </section>
  );
}
