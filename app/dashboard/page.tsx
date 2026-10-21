import type { Metadata } from "next";
import { isAdmin } from "@/lib/auth";
import { listInquiries } from "@/lib/store";
import type { Inquiry } from "@/lib/validation";
import { Dashboard, LoginForm } from "@/components/dashboard";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Inquiry dashboard",
  robots: { index: false, follow: false },
};
export default async function DashboardPage() {
  if (!(await isAdmin())) return <LoginForm />;
  let inquiries: Inquiry[] = [];
  let error = false;
  try {
    inquiries = await listInquiries();
  } catch {
    error = true;
  }
  return <Dashboard initial={inquiries} storageError={error} />;
}
