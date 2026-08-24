import Link from "next/link"
import { ArrowLeft, Wallet } from "lucide-react"
import { ReactNode } from "react"

interface AuthPageLayoutProps {
  children: ReactNode
  title?: string
  description?: string
  footerText?: string
}

export function AuthPageLayout({
  children,
  title = "SpendWise",
  description = "Protected by SSL",
  footerText = "🔒 Secure",
}: AuthPageLayoutProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-linear-to-br from-blue-50/5 to-blue-50/30 p-4">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 h-1/2 w-1/3 rounded-bl-full bg-linear-to-l from-blue-500/20 to-transparent" />
        <div className="absolute bottom-0 left-0 h-1/2 w-1/3 rounded-tr-full bg-linear-to-t from-purple-500/20 to-transparent" />
      </div>

      {/* Back Button - Top Left */}
      <Link
        href="/"
        className="absolute top-4 left-4 inline-flex size-10 items-center justify-center rounded-full bg-background/80 text-muted-foreground shadow-lg backdrop-blur-sm transition-all hover:bg-background hover:text-primary md:top-8 md:left-8"
        aria-label="Go back to home"
      >
        <ArrowLeft className="size-5" />
      </Link>

      <div className="relative w-full max-w-sm space-y-4">
        <Link
          href="/"
          className="group flex items-center justify-center gap-2.5 transition-opacity hover:opacity-80"
          aria-label="Go back to home"
        >
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
            <Wallet className="size-5" />
          </div>
          <span className="font-mono text-xl font-bold tracking-tight text-primary">
            {title}
          </span>
        </Link>

        {children}

        <p className="text-center text-xs text-muted-foreground">
          {footerText} • {description}
        </p>
      </div>
    </main>
  )
}
