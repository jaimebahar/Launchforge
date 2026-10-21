import { z } from "zod";
export const inquirySchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.email().max(254),
  company: z.string().trim().max(150).default(""),
  service: z.enum([
    "Launch Essentials",
    "Growth Launch",
    "Full Launch",
    "Not sure yet",
  ]),
  message: z.string().trim().min(20).max(4000),
  website: z.string().max(0).default(""),
  consent: z.literal(true),
});
export type InquiryInput = z.infer<typeof inquirySchema>;
export type Inquiry = Omit<InquiryInput, "website" | "consent"> & {
  id: string;
  created_at: string;
  status: "new" | "contacted" | "closed";
};
