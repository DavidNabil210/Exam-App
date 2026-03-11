export interface RegisterRequest {
  username: string
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  phone: string
}

export interface RegisterResponse {
  status: boolean
  message: string
}

export interface SendEmailVerificationRequest {
  email: string
}

export interface ConfirmEmailVerificationRequest {
  email: string
  code: string
}

export interface ConfirmEmailVerificationResponse {
  status: boolean
  message: string
}