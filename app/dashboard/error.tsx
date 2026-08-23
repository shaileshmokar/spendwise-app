"use client"

import { useEffect } from "react"
import Link from "next/link"

import PageContainer from "@/components/shared/page-container"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <PageContainer>
      <div className="flex flex-1 items-center justify-center">
        <div className="flex max-w-md flex-col items-center text-center">
          <h1 className="text-5xl font-bold">Something went wrong</h1>

          <p className="mt-3 text-sm text-muted-foreground">
            We couldn&spos;t load this page. Please try again.
          </p>

          <div className="mt-6 flex gap-3">
            <Button onClick={() => reset()}>Try Again</Button>

            <Button variant="outline">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
