import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { DashboardSidebar } from "@/components/dashboard-sidebar";

export default async function UserLayout({ children }: any) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) redirect("/login");

  const decoded = jwt.decode(token) as any;

  const role = decoded?.role?.toLowerCase();

  if (role !== "user") redirect("/dashboard");

  return <>
      <div className='flex min-h-screen max-h-full'>
  
          <DashboardSidebar />
  
          {children}
  
        
  
        </div>
  </>;
}