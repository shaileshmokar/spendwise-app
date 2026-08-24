import { AuthPageLayout } from "@/components/auth/auth-page-layout"
import { LoginForm } from "@/components/auth/login-form"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login - SpendWise",
  description: "Login to your SpendWise account",
}

export default function LoginPage() {
  return (
    <AuthPageLayout footerText="🔒 Secure login">
      <LoginForm />
    </AuthPageLayout>
  )
}
