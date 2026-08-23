import Link from "next/link"
import Image from "next/image"
import { Wallet } from "lucide-react"
import { SignupForm } from "@/components/auth/signup-form"
import { LoginIllustration } from "@/components/auth/login-illustration"

export default function Page() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden bg-muted lg:block">
        {/* <Image
          src="/placeholder.svg"
          alt="Image"
          fill
          priority
          className="object-cover dark:brightness-[0.2] dark:grayscale"
        /> */}
        <LoginIllustration />
      </div>

      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-center">
          <Link href="#" className="flex items-center gap-2 font-medium">
            <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Wallet className="size-6" />
            </div>
            <span className="font-mono text-xl font-bold text-primary">
              SpendWise
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  )
}
