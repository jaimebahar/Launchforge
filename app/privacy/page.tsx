import type { Metadata } from "next";
export const metadata: Metadata = { title: "Privacy policy" };
export default function Privacy() {
  return (
    <article className="container legal-page">
      <span className="eyebrow">YOUR INFORMATION, RESPECTED</span>
      <h1>Privacy policy.</h1>
      <p className="legal-date">Last updated October 21, 2026</p>
      <h2>What we collect</h2>
      <p>
        When you submit an inquiry, LaunchForge collects your name, email,
        optional business name, selected service, and project message. Please do
        not include passwords, payment details, or sensitive personal
        information.
      </p>
      <h2>How we use it</h2>
      <p>
        We use your information to respond to your inquiry, understand your
        project, and discuss our services with you. Submission does not
        subscribe you to marketing emails. We do not sell your personal
        information.
      </p>
      <h2>Email updates and consent</h2>
      <p>
        Our optional LaunchForge Letter signup collects your email address and
        affirmative consent to receive marketing updates. Newsletter signups
        are kept separately identifiable from business inquiries. We use your
        address only for LaunchForge updates and tips when you choose to subscribe.
        You can request to unsubscribe or delete your information at any time by
        emailing launchforge123@gmail.com. We honor opt-out requests before
        sending further marketing messages.
      </p>
      <h2>Storage and service providers</h2>
      <p>
        The production website is designed to be hosted by Vercel, with inquiry
        data stored in Supabase. These providers process information needed to
        operate the site. Hosting providers may process technical request logs.
        Inquiry access is limited to authorized administrators.
      </p>
      <h2>Security and cookies</h2>
      <p>
        We use an essential, HTTP-only cookie for administrator sign-in. Public
        visitors do not need an account. For abuse prevention, a keyed hash of
        your IP address and a request timestamp are used for a one-hour rate-limit
        window. Expired rate-limit records are removed when the next request is processed. We do not add advertising or analytics trackers.
      </p>
      <h2>Retention and your choices</h2>
      <p>
        We keep inquiries while needed to respond and maintain the associated
        business relationship. You may request access, correction, or deletion
        by using the contact form and selecting “Not sure yet.” Include your
        request, but no additional sensitive information. Administrators can
        remove records from the database.
      </p>
      <h2>Questions</h2>
      <p>
        Use our <a href="/contact">contact form</a> for privacy questions or
        requests. If you have already received a reply from our team, you can
        respond directly to that email.
      </p>
    </article>
  );
}
