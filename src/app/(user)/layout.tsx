// app/(user)/layout.tsx
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function UserLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  const role = cookieStore.get("role")?.value;

  console.log("=== USER LAYOUT ===");
  console.log("all cookies:", allCookies);
  console.log("role value:", role);

//   if (role !== "user") redirect("/dashboard");

  return (
    <SidebarProvider>
      <div className="flex min-h-screen max-h-full">
        <DashboardSidebar />
        {children}
      </div>
    </SidebarProvider>
  );
}