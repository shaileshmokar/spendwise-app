import { ArrowDown, ArrowUp } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import { transactionStats } from "@/data/data"

export function TransactionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      {transactionStats.map((stat) => {
        const Icon = stat.icon
        const ChangeIcon = stat.positive ? ArrowUp : ArrowDown

        return (
          <Card key={stat.title} className="@container/card">
            <CardContent className="flex items-center gap-4">
              <div className={`rounded-full p-3 ${stat.bgClass}`}>
                <Icon
                  className={`size-7 ${stat.iconClass}`}
                  fill={stat.filled ? "currentColor" : "none"}
                />
              </div>
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
      })}
    </div>
  )
}
