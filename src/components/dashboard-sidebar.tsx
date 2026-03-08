"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { GraduationCap, Settings, LogOut, FolderCode } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import elevate from "../app/assets/elevate.png"

const navItems = [
  { href: "/dashboard", label: "Diplomas", icon: GraduationCap },
  { href: "/dashboard/account", label: "Account Settings", icon: Settings },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex w-64 flex-col bg-blue-50 text-[oklch(0.92_0.01_250)]">
      <div className="p-10">
        
        {/* <h1 className="text-2xl font-bold tracking-[0.2em] mt-1 text-[oklch(0.95_0.01_250)]">
          ELEVATE
        </h1> */}
        <Image src={elevate} alt="logo" width={192} height={37} className="bg-gray-900"/>
        <Link href="/dashboard" className="flex items-center gap-2">
          <FolderCode className="size-5 text-blue-500" />
          <span className="text-xs text-blue-500">Exam App</span>
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-4">
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard" ||
                pathname.startsWith("/dashboard/exams") ||
                pathname.startsWith("/dashboard/quiz")
              : pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-100 text-blue-500"
                  : "text-gray-500 hover:bg-blue-100 hover:text-blue-500"
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-[oklch(0.28_0.04_260)]">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="size-8 rounded-full bg-[oklch(0.30_0.05_260)] flex items-center justify-center text-xs font-medium text-[oklch(0.80_0.01_250)]">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate text-[oklch(0.88_0.01_250)]">
              John Doe
            </p>
          </div>
          <Link
            href="/login"
            className="text-[oklch(0.50_0.02_250)] hover:text-[oklch(0.85_0.01_250)] transition-colors"
            aria-label="Logout"
          >
            <LogOut className="size-4" />
          </Link>
        </div>
      </div>
    </aside>
  )
}
