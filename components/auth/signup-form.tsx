"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"
import { signUpValidation, type SignUpValidationInput } from "@/lib/validations"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { showErrorToast, showSuccessToast } from "@/lib/toast-utils"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpValidationInput>({
    resolver: zodResolver(signUpValidation),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(values: SignUpValidationInput) {
    const { error } = await authClient.signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
    })

    if (error) {
      showErrorToast(error.message || "Unable to create your account")
      return
    }

    showSuccessToast("Account created successfully! Redirecting...")
    router.push("/auth/login")
    router.refresh()
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Create your SpendWise account to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="name">Name</FieldLabel>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      autoComplete="name"
                      disabled={isSubmitting}
                      aria-invalid={fieldState.invalid}
                      className="h-9"
                      {...field}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive">
                        {errors.name.message}
                      </p>
                    )}
                  </Field>
                )}
              />

              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      autoComplete="email"
                      disabled={isSubmitting}
                      aria-invalid={fieldState.invalid}
                      className="h-9"
                      {...field}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">
                        {errors.email.message}
                      </p>
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      autoComplete="new-password"
                      disabled={isSubmitting}
                      aria-invalid={fieldState.invalid}
                      className="h-9"
                      {...field}
                    />
                    {!errors.password && !fieldState.isDirty && (
                      <p className="text-xs text-muted-foreground">
                        Must be at least 8 characters with uppercase, lowercase,
                        and number
                      </p>
                    )}
                    {errors.password && (
                      <p className="text-sm text-destructive">
                        {errors.password.message}
                      </p>
                    )}
                  </Field>
                )}
              />

              <Controller
                name="confirmPassword"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="confirmPassword">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      id="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      disabled={isSubmitting}
                      aria-invalid={fieldState.invalid}
                      className="h-9"
                      {...field}
                    />
                    {errors.confirmPassword && (
                      <p className="text-sm text-destructive">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </Field>
                )}
              />

              <Field>
                <Button
                  type="submit"
                  className="h-9 w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating account..." : "Create account"}
                </Button>
                <FieldDescription className="text-center">
                  Already have an account?{" "}
                  <Link
                    href="/auth/login"
                    className="underline underline-offset-4"
                  >
                    Login
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By creating an account, you agree to our{" "}
        <Link href="/terms" className="underline underline-offset-4">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline underline-offset-4">
          Privacy Policy
        </Link>
        .
      </FieldDescription>
    </div>
  )
}
