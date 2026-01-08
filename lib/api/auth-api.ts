import { apiService } from "../api-client"

// Types
export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
}

export interface LoginResponse {
  user: {
    id: string
    name: string
    email: string
  }
  token: string
  message?: string
}

export interface RegisterResponse {
  message: string
  user?: {
    id: string
    name: string
    email: string
  }
}

export interface OTPRequest {
  email: string
  otp: string
}

export interface OTPResponse {
  user: {
    id: string
    name: string
    email: string
  }
  token: string
  message?: string
}

export interface ResetPasswordRequest {
  email: string
}

export interface ResetPasswordResponse {
  message: string
}

export interface NewPasswordRequest {
  token: string
  password: string
  confirmPassword: string
}

export interface NewPasswordResponse {
  message: string
}

// Auth API functions
export const authAPI = {
  // Login
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    return apiService.post<LoginResponse>("/auth/login", data)
  },

  // Register
  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    return apiService.post<RegisterResponse>("/auth/register", data)
  },

  // Verify OTP
  verifyOTP: async (data: OTPRequest): Promise<OTPResponse> => {
    return apiService.post<OTPResponse>("/auth/verify-otp", data)
  },

  // Resend OTP
  resendOTP: async (email: string): Promise<{ message: string }> => {
    return apiService.post<{ message: string }>("/auth/resend-otp", { email })
  },

  // Reset Password Request
  resetPassword: async (
    data: ResetPasswordRequest
  ): Promise<ResetPasswordResponse> => {
    return apiService.post<ResetPasswordResponse>("/auth/reset-password", data)
  },

  // Set New Password
  newPassword: async (
    data: NewPasswordRequest
  ): Promise<NewPasswordResponse> => {
    return apiService.post<NewPasswordResponse>("/auth/new-password", data)
  },

  // Logout (if backend has logout endpoint)
  logout: async (): Promise<{ message: string }> => {
    return apiService.post<{ message: string }>("/auth/logout")
  },
}

