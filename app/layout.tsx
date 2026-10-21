import type { Metadata } from "next";
import { Header, Footer } from "@/components/site";
import "@fontsource-variable/dm-sans";
import "@fontsource-variable/space-grotesk";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://launchforge-rouge.vercel.app"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Kivorly Studio",
    url: "https://launchforge-rouge.vercel.app",
    title: "Kivorly Studio | Business Launch Plans, Branding & Websites",
    description: "Kivorly Studio helps turn business ideas into brands, professional websites, and practical launch plans. Packages start at $99.",
  },
  title: {
    default: "Kivorly Studio — From what if to what’s next.",
    template: "%s | Kivorly Studio",
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
