import React from "react"
import { ArrowDown, ArrowUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card"
import type { StatCardData } from "@/type/types"

type StatCardProps = {
  stat: StatCardData
}

export function StatCard({ stat }: StatCardProps) {
  const Icon = stat.icon
  const ChangeIcon = stat.positive ? ArrowUp : ArrowDown

  return (
    <Card className="@container/card">
      <CardContent className="flex items-center gap-4">
        {/* Icon */}
        <div className={`rounded-full p-3 ${stat.bgClass}`}>
          <Icon
            className={`size-7 ${stat.iconClass}`}
            fill={stat.filled ? "currentColor" : "none"}
          />
        </div>

        {/* Content */}
        <div className="flex flex-col">
          <CardDescription>{stat.title}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums">
            {stat.value}
          </CardTitle>
          <p
            className={`flex items-center text-xs font-semibold whitespace-nowrap ${stat.positive ? "text-green-600" : "text-red-600"}`}
          >
            <ChangeIcon className="size-4 shrink-0" />
            {stat.change}
            <span className="ml-1 text-xs font-light text-muted-foreground">
              vs last month
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
