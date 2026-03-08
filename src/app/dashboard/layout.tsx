
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
     <SidebarProvider>
      <div className='grid grid-cols-[30rem_1fr] min-h-screen max-h-full'>

        <DashboardSidebar />

        {children}

        {role === 'admin' ? admin : user}

      </div>
    </SidebarProvider>
  )
}
