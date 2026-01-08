"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/ui/password-input"
import { ContainerBox } from "@/components/ui/container-box"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect, Suspense } from "react"
import PublicRoute from "@/components/PublicRoute"
import { authAPI } from "@/lib/api/auth-api"
import { newPasswordSchema, type NewPasswordFormData } from "@/lib/validations/auth-schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

function NewPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [token, setToken] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPasswordFormData>({
    resolver: zodResolver(newPasswordSchema),
  })

  useEffect(() => {
    const resetToken = searchParams.get("token")
    if (resetToken) {
      setToken(resetToken)
    } else {
      setError("Invalid reset token. Please request a new password reset.")
    }
  }, [searchParams])

  const onSubmit = async (data: NewPasswordFormData) => {
    setError("")

    if (!token) {
      setError("Reset token is missing. Please request a new password reset.")
      return
    }

    setLoading(true)

    try {
      await authAPI.newPassword({
        token,
        password: data.password,
        confirmPassword: data.confirmPassword,
      })
      alert("Password reset successful!")
      router.push("/login")
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Failed to reset password. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <PublicRoute>
      <div className="flex min-h-screen items-center justify-center py-16">
        <ContainerBox maxWidth="md" className="w-full">
          <Card className="w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">New Password</CardTitle>
            <CardDescription>
              Enter your new password below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {error && (
                <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md border border-destructive/20">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <PasswordInput
                  id="password"
                  placeholder="Enter new password"
                  {...register("password")}
                  disabled={loading || !token}
                  className={errors.password ? "border-destructive" : ""}
                />
                {errors.password && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <PasswordInput
                  id="confirmPassword"
                  placeholder="Confirm new password"
                  {...register("confirmPassword")}
                  disabled={loading || !token}
                  className={errors.confirmPassword ? "border-destructive" : ""}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={loading || !token}>
                {loading ? "Resetting..." : "Reset Password"}
              </Button>
            </form>
          </CardContent>
        </Card>
        </ContainerBox>
      </div>
    </PublicRoute>
  )
}

export default function NewPasswordPage() {
  return (
    <Suspense fallback={
      <PublicRoute>
        <div className="flex min-h-screen items-center justify-center py-16">
          <ContainerBox maxWidth="md" className="w-full">
            <Card className="w-full">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">Loading...</CardTitle>
              </CardHeader>
            </Card>
          </ContainerBox>
        </div>
      </PublicRoute>
    }>
      <NewPasswordForm />
    </Suspense>
  )
}

