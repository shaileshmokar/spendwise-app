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

// export function LoginForm({
//   className,
//   ...props
// }: React.ComponentProps<"form">) {
//   return (
//     <form className={cn("flex flex-col gap-6", className)} {...props}>
//       <FieldGroup>
//         <div className="flex flex-col items-center gap-1 text-center">
//           <h1 className="text-2xl font-bold">Login to your account</h1>
//           <p className="text-sm text-balance text-muted-foreground">
//             Enter your email below to login to your account
//           </p>
//         </div>
//         <Field>
//           <FieldLabel htmlFor="email">Email</FieldLabel>
//           <Input
//             id="email"
//             type="email"
//             placeholder="m@example.com"
//             required
//             className="h-9"
//           />
//         </Field>
//         <Field>
//           <div className="flex items-center">
//             <FieldLabel htmlFor="password">Password</FieldLabel>
//             <a
//               href="#"
//               className="ml-auto text-sm underline-offset-4 hover:underline"
//             >
//               Forgot your password?
//             </a>
//           </div>
//           <Input id="password" type="password" required className="h-9" />
//         </Field>
//         <Field>
//           <Button type="submit" className="h-9">
//             Login
//           </Button>
//         </Field>
//         <Field>
//           <FieldDescription className="text-center">
//             Don&apos;t have an account?{" "}
//             <Link href="/auth/signup" className="underline underline-offset-4">
//               Sign up
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

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter()

  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const [isLoading, setIsLoading] = React.useState(false)

  const [error, setError] = React.useState("")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setError("")
    setIsLoading(true)

    const { error } = await authClient.signIn.email({
      email,
      password,
    })

    if (error) {
      setError(error.message || "Invalid email or password.")

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
          <h1 className="text-2xl font-bold">Login to your account</h1>

          <p className="text-sm text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>

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
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>

            <Link
              href="/auth/forgot-password"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>

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

        {error && <p className="text-sm text-destructive">{error}</p>}

        <Field>
          <Button type="submit" className="h-9" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </Field>

        <Field>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="underline underline-offset-4">
              Sign up
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
