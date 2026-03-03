"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({})
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // Logic is ignored for design focus
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">Welcome Back</h1>
        <p className="text-center text-gray-500 mb-8">Sign in to your account to continue</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="username" className="font-medium text-gray-700">Username</Label>
            <Input
              id="username"
              name="username"
              placeholder="Enter your username"
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              aria-invalid={!!errors.username}
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="font-medium text-gray-700">Password</Label>
              <Link
                href="/forgot-password"
                className="text-sm text-indigo-600 hover:underline"
              >
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                aria-invalid={!!errors.password}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-indigo-600 text-white hover:bg-indigo-700 font-semibold py-2 rounded-lg transition-all"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Login"}
          </Button>

          <p className="text-sm text-center text-gray-500 mt-4">
            Don't have an account?{" "}
            <Link href="/register" className="text-indigo-600 font-medium hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}