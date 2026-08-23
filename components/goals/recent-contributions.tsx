"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { contributions } from "@/data/goals"
import { formatCurrency } from "@/lib/utils"

export default function RecentContributions() {
  return (
    <Card className="">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base font-semibold">
          Recent Contributions
        </CardTitle>

        <Button
          variant="ghost"
          className="h-auto px-0 text-sm font-medium text-primary hover:bg-transparent hover:text-primary"
        >
          View All
        </Button>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="divide-y">
          {contributions.map((contribution) => {
            const Icon = contribution.icon

            return (
              <div
                key={contribution.id}
                className="flex items-center gap-3 py-3 first:pt-1 last:pb-3"
              >
                {/* Icon */}
                <div
                  className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${contribution.bgClass}`}
                >
                  <Icon
                    className={`size-5 ${contribution.iconClass}`}
                    strokeWidth={2}
                  />
                </div>

                {/* Details */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {contribution.title}
                  </p>

                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {contribution.date}
                  </p>
                </div>

                {/* Amount */}
                <span className="shrink-0 text-sm font-semibold text-emerald-600">
                  + {formatCurrency(contribution.amount)}
                </span>
              </div>
            )
          })}
        </div>

        {/* Bottom View All */}
        <div className="mt-2 border-t pt-4 text-center">
          <Button
            variant="ghost"
            className="h-auto gap-1 px-0 text-sm font-medium text-primary hover:bg-transparent hover:text-primary"
          >
            View All Contributions
            <span className="text-lg leading-none">›</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
