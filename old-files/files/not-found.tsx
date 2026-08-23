import Link from "next/link"
import { ArrowLeft, FileQuestion } from "lucide-react"

import PageContainer from "@/components/shared/page-container"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function NotFound() {
  return (
    <PageContainer className="min-h-[calc(100vh-4rem)] items-center justify-center">
      <div className="flex max-w-md flex-col items-center text-center">
        {/* Icon */}
        <div className="mb-4 flex size-20 items-center justify-center rounded-full bg-red-100">
          <FileQuestion className="size-10 text-red-600" />
        </div>

        <h1 className="text-7xl font-bold tracking-tight">404</h1>

        <h2 className="mt-4 text-2xl font-semibold">Page not found</h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>

        <Link href="/" className={cn(buttonVariants(), "mt-6")}>
          <ArrowLeft />
          Back to Dashboard
        </Link>
      </div>
    </PageContainer>
  )
}
