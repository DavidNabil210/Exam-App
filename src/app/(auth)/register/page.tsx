"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"

import type {
  RegisterRequest,
  ConfirmEmailVerificationRequest,
} from "@/lib/types/auth"

import {
  registerUser,
  sendEmailVerification,
  confirmEmailVerification,
} from "@/lib/api/auth/auth.api"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Step = "register" | "verify" | "success"

export default function Registerpage() {
  const [step, setStep] = useState<Step>("register")
  const [email, setEmail] = useState("")
  const [pendingData, setPendingData] = useState<RegisterRequest | null>(null) 

  const registerForm = useForm<RegisterRequest>()
  const verifyForm = useForm<ConfirmEmailVerificationRequest>()

  // STEP 1 
  const onSubmitRegister = async (data: RegisterRequest) => {
    try {
      await sendEmailVerification({ email: data.email })
      setPendingData(data)
      setEmail(data.email)
      setStep("verify")
    } catch (error) {
      console.error("Send verification failed", error)
    }
  }

  // STEP 2 
  const onSubmitVerify = async (data: ConfirmEmailVerificationRequest) => {
    try {
      await confirmEmailVerification({ email, code: data.code })
      await registerUser(pendingData!)
      setStep("success")
    } catch (error) {
      console.error("Failed", error)
    }
  }

  return (
    <div className="max-w-md mx-auto space-y-6">

      {/* STEP 1 — REGISTER FORM */}
      {step === "register" && (
        <form onSubmit={registerForm.handleSubmit(onSubmitRegister)} className="space-y-4">
          <Input
            placeholder="Email"
            type="email"
            {...registerForm.register("email", { required: true })}
          />
          <Input
            placeholder="Username"
            {...registerForm.register("username", { required: true })}
          />
          <Input
            placeholder="First Name"
            {...registerForm.register("firstName", { required: true })}
          />
          <Input
            placeholder="Last Name"
            {...registerForm.register("lastName", { required: true })}
          />
          <Input
            placeholder="Phone"
            {...registerForm.register("phone", { required: true })}
          />
          <Input
            type="password"
            placeholder="Password"
            {...registerForm.register("password", { required: true, minLength: 8 })}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            {...registerForm.register("confirmPassword", { required: true })}
          />
          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </form>
      )}

      {/* STEP 2 — VERIFY CODE */}
      {step === "verify" && (
        <form onSubmit={verifyForm.handleSubmit(onSubmitVerify)} className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Enter the verification code sent to {email}
          </p>
          <Input
            placeholder="Verification Code"
            {...verifyForm.register("code", { required: true })}
          />
          <Button type="submit" className="w-full">
            Verify Email
          </Button>
        </form>
      )}

      {/* STEP 3 — SUCCESS */}
      {step === "success" && (
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold">Account Created </h2>
          <p className="text-muted-foreground">
            Your email has been verified and your account is ready.
          </p>
        </div>
      )}

    </div>
  )
}