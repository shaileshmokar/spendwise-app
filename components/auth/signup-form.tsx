// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import {
//   Field,
//   FieldDescription,
//   FieldGroup,
//   FieldLabel,
// } from "@/components/ui/field"
// import { Input } from "@/components/ui/input"
// import Link from "next/link"

// export function SignupForm({
//   className,
//   ...props
// }: React.ComponentProps<"form">) {
//   return (
//     <form className={cn("flex flex-col gap-6", className)} {...props}>
//       <FieldGroup>
//         <div className="flex flex-col items-center gap-1 text-center">
//           <h1 className="text-2xl font-bold">Create your account</h1>
//           <p className="text-sm text-balance text-muted-foreground">
//             Fill in the form below to create your account
//           </p>
//         </div>
//         <Field>
//           <FieldLabel htmlFor="name">Full Name</FieldLabel>
//           <Input
//             id="name"
//             type="text"
//             placeholder="John Doe"
//             required
//             className="h-9"
//           />
//         </Field>
//         <Field>
//           <FieldLabel htmlFor="email">Email</FieldLabel>
//           <Input
//             id="email"
//             type="email"
//             placeholder="m@example.com"
//             required
//             className="h-9"
//           />
//           <FieldDescription>
//             We&apos;ll use this to contact you. We will not share your email
//             with anyone else.
//           </FieldDescription>
//         </Field>
//         <Field>
//           <FieldLabel htmlFor="password">Password</FieldLabel>
//           <Input id="password" type="password" required className="h-9" />
//           <FieldDescription>
//             Must be at least 8 characters long.
//           </FieldDescription>
//         </Field>
//         <Field>
//           <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
//           <Input
//             id="confirm-password"
//             type="password"
//             required
//             className="h-9"
//           />
//           <FieldDescription>Please confirm your password.</FieldDescription>
//         </Field>
//         <Field>
//           <Button type="submit" className="h-9">
//             Create Account
//           </Button>
//         </Field>
//         <Field>
//           <FieldDescription className="text-center">
//             Already have an account?{" "}
//             <Link href="/auth/login" className="underline underline-offset-4">
//               Sign in
//             </Link>
//           </FieldDescription>
//         </Field>
//       </FieldGroup>
//     </form>
//   )
// }

"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { authClient } from "@/lib/auth-client"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter()

  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")

  const [isLoading, setIsLoading] = React.useState(false)

  const [error, setError] = React.useState("")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.")
      return
    }

    setIsLoading(true)

    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
    })

    if (error) {
      setError(error.message || "Unable to create your account.")

      setIsLoading(false)
      return
    }

    router.push("/")
    router.refresh()
  }

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>

          <p className="text-sm text-balance text-muted-foreground">
            Create your SpendWise account
          </p>
        </div>

        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>

          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            disabled={isLoading}
            className="h-9"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>

          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            disabled={isLoading}
            className="h-9"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>

          <Input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            disabled={isLoading}
            className="h-9"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>

          <Input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
            disabled={isLoading}
            className="h-9"
          />
        </Field>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <Field>
          <Button type="submit" className="h-9" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
        </Field>

        <Field>
          <FieldDescription className="text-center">
            Already have an account?{" "}
            <Link href="/auth/login" className="underline underline-offset-4">
              Login
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
