// lib/schemas.ts
import { z } from "zod"

export const signUpValidation = z
  .object({
    name: z
      .string()
      .min(1, "Please enter your full name")
      .min(2, "Name must be at least 2 characters long")
      .max(50, "Name is too long (maximum 50 characters)")
      .regex(
        /^[a-zA-Z\s'-]+$/,
        "Name can only contain letters, spaces, apostrophes, and hyphens"
      ),
    email: z
      .string()
      .min(1, "Email address is required")
      .email("Please enter a valid email address (e.g., name@example.com)"),
    password: z
      .string()
      .min(1, "Please create a password")
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match. Please try again",
    path: ["confirmPassword"],
  })

export const loginValidation = z.object({
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
})

export type SignUpValidationInput = z.infer<typeof signUpValidation>
export type LoginValidationInput = z.infer<typeof loginValidation>
