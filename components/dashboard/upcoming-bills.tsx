import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { UpcomingBill } from "@/type/dashboard"
import { Separator } from "../ui/separator"

type UpcomingBillsProps = {
  data: UpcomingBill[]
}

export function UpcomingBills({ data }: UpcomingBillsProps) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Upcoming Bills</CardTitle>

        <button className="text-sm font-medium text-primary hover:underline">
          View All
        </button>
      </CardHeader>
      <Separator />

      <CardContent className="space-y-4">
        {data.map((bill) => {
          const Icon = bill.icon

          return (
            <div key={bill.name} className="flex items-center gap-3">
              {/* Icon */}
              <div
                className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${bill.bgClass}`}
              >
                <Icon className={`size-5 ${bill.iconClass}`} />
              </div>

              {/* Bill Details */}
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium">{bill.name}</div>

                <div className="mt-0.5 text-xs text-muted-foreground">
                  {bill.date}
                </div>
              </div>

              {/* Amount + Due */}
              <div className="shrink-0 text-right">
                <div className="text-sm font-semibold">
                  {formatCurrency(bill.amount)}
                </div>

                <div className="mt-0.5 text-xs text-red-500">{bill.dueIn}</div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
