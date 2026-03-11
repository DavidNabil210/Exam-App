import {
  RegisterRequest,
  SendEmailVerificationRequest,
  ConfirmEmailVerificationRequest,
} from "@/lib/types/auth"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export async function registerUser(data: RegisterRequest) {
  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  const result = await res.json()

  if (!res.ok) {
    throw new Error(result.message || "Registration failed")
  }

  return result
}

export async function sendEmailVerification(data: SendEmailVerificationRequest) {
  const res = await fetch(`${BASE_URL}/api/auth/send-email-verification`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  const result = await res.json() // ✅ read once

  if (!res.ok) {
    throw new Error(result.message || "Send verification failed")
  }

  return result // ✅ return the already-parsed result
}

export async function confirmEmailVerification(data: ConfirmEmailVerificationRequest) {
  const res = await fetch(`${BASE_URL}/api/auth/confirm-email-verification`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  const result = await res.json() // ✅ read before checking ok, to capture error body

  if (!res.ok) {
    throw new Error(result.message || "Verification failed")
  }

  return result
}