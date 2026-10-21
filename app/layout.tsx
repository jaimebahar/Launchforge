import type { Metadata } from "next";
import { Header, Footer } from "@/components/site";
import "@fontsource-variable/dm-sans";
import "@fontsource-variable/space-grotesk";
import "./globals.css";
export const metadata: Metadata = {
  title: {
    default: "LaunchForge — From what if to what’s next.",
    template: "%s | LaunchForge",
  },
  description:
    "Turn your business idea into a launch-ready brand. Strategy, branding, websites, and launch support. Clear packages starting at $99.",
  robots: { index: true, follow: true },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
