import { Goal } from "lucide-react"
import Link from "next/link"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { formatCurrency } from "@/lib/utils"
import { FinancialGoal } from "@/type/dashboard"

type FinancialGoalProps = {
  data: FinancialGoal
}

export function FinancialGoals({ data }: FinancialGoalProps) {
  const percentage = Math.round((data.current / data.target) * 100)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Goal</CardTitle>
        <CardAction className="text-sm font-medium text-primary hover:underline">
          <Link href="/goals">View Goals</Link>
        </CardAction>
      </CardHeader>

      <CardContent>
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-green-100">
            <Goal className="size-8 text-green-600" />
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1 space-y-1">
            {/* Title */}
            <span className="block truncate text-sm font-bold">
              {data.title}
            </span>

            {/* Progress Info */}
            <div className="flex items-center justify-between gap-2">
              <span className="min-w-0 truncate text-xs text-muted-foreground">
                {data.message}
              </span>

              <div className="shrink-0 text-xs">
                <span className="font-semibold">
                  {formatCurrency(data.current)}
                </span>

                <span className="text-muted-foreground">
                  {" "}
                  / {formatCurrency(data.target)}
                </span>
              </div>
            </div>

            {/* Progress */}
            <div className="flex items-center gap-2">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-green-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <span className="w-8 text-right text-xs font-bold text-green-600">
                {percentage}%
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
