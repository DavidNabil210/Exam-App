import { AuthSidebar } from '@/components/auth-sidebar'
import React from 'react'

type Props = {
  children: React.ReactNode
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex">
      
      {/* Left Side */}
      <div className="hidden lg:flex w-1/2  bg-gradient-to-br from-[#f9fafb] to-[#8ec5ff] flex items-center justify-center">
        <AuthSidebar />
      </div>

      {/* Right Side */}
      <div className="flex flex-1 items-center justify-center p-6 bg-gray-50">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>

    </div>
  )
}