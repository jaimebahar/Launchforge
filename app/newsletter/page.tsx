import type { Metadata } from "next";
import { NewsletterForm } from "@/components/newsletter-form";
export const metadata: Metadata = {
  title: "LaunchForge Letter",
  description: "Opt in to occasional business-launch tips and LaunchForge updates.",
};
export default function NewsletterPage() {
  return <main className="newsletter-page"><NewsletterForm /></main>;
}
