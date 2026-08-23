import React from "react"
import { cn } from "@/lib/utils"

type PageContainerProps = {
  children: React.ReactNode
  className?: string
}

export default function PageContainer({
  children,
  className,
}: PageContainerProps) {
  return (
    <div
      className={cn(
        "@container/main flex flex-1 flex-col gap-4 p-4 lg:px-6",
        className
      )}
    >
      {children}
    </div>
  )
}
