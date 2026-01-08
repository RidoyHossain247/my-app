"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ContainerBox } from "@/components/ui/container-box"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { useAuthStore } from "@/app/src/store/useAuthStore"
import PublicRoute from "@/components/PublicRoute"
import { authAPI } from "@/lib/api/auth-api"
import { otpSchema, type OTPFormData } from "@/lib/validations/auth-schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"

export default function OTPPage() {
  const router = useRouter()
  const { login } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [error, setError] = useState<string>("")
  const [email, setEmail] = useState<string>("")

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  })

  const otpValue = watch("otp")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedEmail = sessionStorage.getItem("registerEmail")
      if (storedEmail) {
        setEmail(storedEmail)
      } else {
        router.push("/register")
      }
    }
  }, [router])

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return // Only allow numbers
    if (value.length > 1) return

    const currentOtp = otpValue || ""
    const newOtp = currentOtp.split("")
    newOtp[index] = value
    const updatedOtp = newOtp.join("").slice(0, 6)
    setValue("otp", updatedOtp, { shouldValidate: true })

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otpValue?.[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      prevInput?.focus()
    }
  }

  const onSubmit = async (data: OTPFormData) => {
    setError("")

    if (!email) {
      setError("Email not found. Please register again.")
      return
    }

    setLoading(true)

    try {
      const response = await authAPI.verifyOTP({
        email,
        otp: data.otp,
      })

      login(response.user, response.token)
      sessionStorage.removeItem("registerEmail")
      router.push("/dashboard")
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Invalid OTP. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  const handleResendOTP = async () => {
    if (!email) return

    setResendLoading(true)
    try {
      await authAPI.resendOTP(email)
      alert("OTP resent successfully!")
    } catch (err: any) {
      alert(
        err.response?.data?.message || "Failed to resend OTP. Please try again."
      )
    } finally {
      setResendLoading(false)
    }
  }

  return (
    <PublicRoute>
      <div className="flex min-h-screen items-center justify-center py-16">
        <ContainerBox maxWidth="md" className="w-full">
          <Card className="w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Verify OTP</CardTitle>
            <CardDescription>
              Enter the 6-digit code sent to your email
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {error && (
                <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md border border-destructive/20">
                  {error}
                </div>
              )}
              <div className="flex flex-col items-center gap-2">
                <div className="flex justify-center gap-2">
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <Input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={otpValue?.[index] || ""}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className={`w-12 h-14 text-center text-xl font-semibold ${
                        errors.otp ? "border-destructive" : ""
                      }`}
                      disabled={loading}
                    />
                  ))}
                </div>
                {errors.otp && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.otp.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              <span className="text-muted-foreground">
                Didn't receive the code?{" "}
              </span>
              <button
                type="button"
                className="text-primary hover:underline disabled:opacity-50"
                onClick={handleResendOTP}
                disabled={resendLoading}
              >
                {resendLoading ? "Sending..." : "Resend"}
              </button>
            </div>
          </CardContent>
        </Card>
        </ContainerBox>
      </div>
    </PublicRoute>
  )
}

