import { AuthPageLayout } from "@/components/auth/auth-page-layout"
import { SignupForm } from "@/components/auth/signup-form"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Signup - SpendWise",
  description: "Signup to your SpendWise account",
}

export default function SignupPage() {
  return (
    <AuthPageLayout footerText="🔒 Secure signup">
      <SignupForm />
    </AuthPageLayout>
  )
}
