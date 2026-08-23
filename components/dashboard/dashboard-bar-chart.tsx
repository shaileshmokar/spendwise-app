"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// import { dashboardMonthFilters } from "@/data/dashboard"
import { CashFlowData } from "@/type/dashboard"

const chartConfig = {
  income: {
    label: "Income",
    color: "var(--chart-1)",
  },
  expenses: {
    label: "Expenses",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

type DashboardChartBarProps = {
  data: CashFlowData[]
}

export function DashboardChartBar({ data }: DashboardChartBarProps) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle>Income vs Expenses</CardTitle>

        {/* <CardAction>
          <Select defaultValue="this-month" items={dashboardMonthFilters}>
            <SelectTrigger className="w-full max-w-48">
              <SelectValue />
            </SelectTrigger>

            <SelectContent side="left" align="start">
              <SelectGroup>
                {dashboardMonthFilters.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardAction> */}

        <CardAction>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-xs bg-chart-1" />
              <span>Income</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-xs bg-chart-2" />
              <span>Expenses</span>
            </div>
          </div>
        </CardAction>
      </CardHeader>

      <CardContent className="min-h-0 flex-1 px-0">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />

            <YAxis
              domain={[0, 30000]}
              ticks={[0, 10000, 20000, 30000]}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => {
                if (value === 0) return "₹0"
                return `₹${value / 1000}k`
              }}
            />

            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

            <Bar dataKey="income" fill="var(--color-income)" radius={4} />

            <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
