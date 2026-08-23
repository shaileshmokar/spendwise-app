import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "../ui/separator"
import { formatCurrency } from "@/lib/utils"
import { RecentTransaction } from "@/type/dashboard"

type RecentTransactionProps = {
  data: RecentTransaction[]
}

export function RecentTransactions({ data }: RecentTransactionProps) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Transactions</CardTitle>

        <button className="text-sm font-medium text-primary hover:underline">
          View All
        </button>
      </CardHeader>
      <Separator />

      {/* <ScrollArea className="h-80"> */}
      <CardContent className="space-y-4">
        {data.map((transaction) => {
          const Icon = transaction.icon

          return (
            <div
              key={`${transaction.name}-${transaction.date}`}
              className="flex min-w-0 items-center gap-3"
            >
              {/* Icon */}
              <div
                className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${transaction.bgClass}`}
              >
                <Icon className={`size-5 ${transaction.iconClass}`} />
              </div>

              {/* Transaction Details */}
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium">
                  {transaction.name}
                </div>

                <div className="mt-0.5 truncate text-xs text-muted-foreground">
                  {transaction.category}
                </div>
              </div>

              {/* Date + Amount */}
              <div className="shrink-0 text-right">
                {/* Amount */}
                <div
                  className={`text-sm font-semibold ${
                    transaction.type === "income"
                      ? "text-emerald-500"
                      : "text-red-500"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}
                  {formatCurrency(transaction.amount)}
                </div>
                <div className="text-xs text-muted-foreground sm:block">
                  {transaction.date}
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
      {/* </ScrollArea> */}
    </Card>
  )
}
