"use client"

import { Bell } from "lucide-react"

import { Button } from "@/components/ui/button"

export function HeaderNotifications() {
  return (
    <Button
      variant="outline"
      size="icon"
      className="relative size-10 shrink-0"
      aria-label="Notifications"
    >
      <Bell className="size-4" />

      <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
        3
      </span>
    </Button>
  )
}
