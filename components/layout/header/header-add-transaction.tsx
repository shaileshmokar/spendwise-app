import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"

export function HeaderAddTransaction() {
  return (
    <Button className="h-10 shrink-0 gap-2 px-3 sm:px-4">
      <Plus className="size-4" />

      <span className="hidden sm:inline">Add Transaction</span>
    </Button>
  )
}
