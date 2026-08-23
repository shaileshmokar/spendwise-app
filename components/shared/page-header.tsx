// import { Button } from "../ui/button"
// import { Plus } from "lucide-react"

// type PageHeaderProps = {
//   title: string
//   subTitle: string
//   showAddButton?: boolean
//   addButtonText?: string
//   onAdd?: () => void
// }

// export default function PageHeader({
//   title,
//   subTitle,
//   showAddButton = true,
//   addButtonText = "",
//   onAdd,
// }: PageHeaderProps) {
//   return (
//     <div className="flex items-center justify-between">
//       <div className="flex flex-col">
//         <h1 className="text-2xl font-bold tracking-normal">{title}</h1>
//         <p className="text-sm tracking-tight text-muted-foreground">
//           {subTitle}
//         </p>
//       </div>

//       {showAddButton && (
//         <Button onClick={onAdd} className="h-10 shrink-0 gap-2 px-3 sm:px-4">
//           <Plus className="size-4 text-white" />
//           <span className="hidden sm:inline">Add {addButtonText}</span>
//         </Button>
//       )}
//     </div>
//   )
// }

"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"
import { HeaderDateRange } from "../layout/header/header-date-range"

type PageHeaderProps = {
  title: string
  subTitle: string
  action?: ReactNode
}
const dateRangePages = ["/", "/reports"]

export default function PageHeader({
  title,
  subTitle,
  action,
}: PageHeaderProps) {
  const pathname = usePathname()
  const showDateRange = dateRangePages.includes(pathname)

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold tracking-normal">{title}</h1>

        <p className="text-sm tracking-tight text-muted-foreground">
          {subTitle}
        </p>
      </div>

      <div className="flex gap-2">
        {showDateRange && <HeaderDateRange />}
        {action}
      </div>
    </div>
  )
}
