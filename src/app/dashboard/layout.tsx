
import { DashboardSidebar } from '@/components/dashboard-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { cookies } from 'next/headers';
import { forbidden, permanentRedirect, redirect, unauthorized } from 'next/navigation';
import React from 'react'

interface DashboardLayoutProps {
  children: React.ReactNode;
  admin: React.ReactNode;
  user: React.ReactNode;
}

export default async function DashboardLayout({ children, admin, user }: DashboardLayoutProps) {
  const cookieStore = await cookies();
  
  const role = cookieStore.get('role')?.value;




return (
  
    <div className="flex min-h-screen">
      <DashboardSidebar />

      <main className="flex-1 p-4">
        {role === 'admin' ? admin : user}
      </main>
    </div>
 
);
}
