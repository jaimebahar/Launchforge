import type { MetadataRoute } from "next";

const base = "https://launchforge-rouge.vercel.app";
export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date("2026-10-21");
  return [
    { url: base, lastModified: updated, changeFrequency: "weekly", priority: 1 },
    { url: base + "/services", lastModified: updated, changeFrequency: "monthly", priority: 0.9 },
    { url: base + "/pricing", lastModified: updated, changeFrequency: "monthly", priority: 0.9 },
    { url: base + "/contact", lastModified: updated, changeFrequency: "monthly", priority: 0.7 },
    { url: base + "/privacy", lastModified: updated, changeFrequency: "yearly", priority: 0.2 },
  ];
}
