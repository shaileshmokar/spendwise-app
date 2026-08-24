"use client"

import { useEffect, useState } from "react"
import { Loader2, Wallet } from "lucide-react"

export default function Loading() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/50 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 rounded-xl bg-background p-8 shadow-lg">
        {/* Logo */}
        <div className="flex size-14 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Wallet className="size-7" />
        </div>

        {/* Loading */}
        <div className="flex items-center gap-2">
          <Loader2 className="size-4 animate-spin text-primary" />

          <span className="text-sm font-medium text-muted-foreground">
            Loading SpendWise...
          </span>
        </div>
      </div>
    </div>
  )
}
