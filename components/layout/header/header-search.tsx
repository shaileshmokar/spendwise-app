import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"

export function HeaderSearch() {
  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

      <Input
        placeholder="Search transactions, categories..."
        className="h-10 border-0 bg-muted/50 pr-14 pl-10 shadow-none focus-visible:ring-1"
      />

      <div className="absolute top-1/2 right-2 hidden -translate-y-1/2 items-center gap-0.5 rounded-md border bg-background px-1.5 py-0.5 text-xs text-muted-foreground sm:flex">
        <span>⌘</span>
        <span>K</span>
      </div>
    </div>
  )
}
