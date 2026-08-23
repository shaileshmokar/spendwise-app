import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card"
import Link from "next/link"
import { Lightbulb } from "lucide-react"
import { FinancialTip } from "@/type/dashboard"

type FinancialTipsProps = {
  data: FinancialTip
}

export function FinancialTips({ data }: FinancialTipsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Tips</CardTitle>
        <CardAction>
          <Link
            href="/tips"
            className="text-sm font-medium text-primary hover:underline"
          >
            View All Tips
          </Link>
        </CardAction>
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-3">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-green-100">
            <Lightbulb className="size-8 text-green-600" />
          </div>

          <div className="min-w-0 flex-1">
            <span className="text-sm">{data.title}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
