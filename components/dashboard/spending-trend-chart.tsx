"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

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
import { Dot } from "lucide-react"

// import { dashboardMonthFilters } from "@/data/dashboard"
import { SpendingTrend } from "@/type/dashboard"

const chartConfig = {
  spending: {
    label: "Spending",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

const formatCurrency = (value: number) => {
  return `₹${value.toLocaleString("en-IN")}`
}

type SpendingTrendProps = {
  data: SpendingTrend[]
}

export function SpendingTrendChart({ data }: SpendingTrendProps) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle>Spending Trend</CardTitle>

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
      </CardHeader>

      <CardContent className="min-h-0 flex-1 px-4">
        <ChartContainer config={chartConfig} className="h-full min-h-70 w-full">
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 0,
              right: 0,
              top: 10,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="spendingGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-spending)"
                  stopOpacity={0.25}
                />

                <stop
                  offset="100%"
                  stopColor="var(--color-spending)"
                  stopOpacity={0.02}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={true}
              horizontal={true}
              strokeDasharray="0"
            />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              interval={0}
              tickFormatter={(value) => value}
            />

            <YAxis
              domain={[0, 20000]}
              ticks={[0, 5000, 10000, 15000, 20000]}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                if (value === 0) return "₹0"

                return `₹${value / 1000}K`
              }}
            />

            <ChartTooltip
              cursor={{
                stroke: "var(--color-spending)",
                strokeDasharray: "3 3",
              }}
              content={
                <ChartTooltipContent
                  hideLabel
                  formatter={(value, name, item) => {
                    const label = item.payload?.date

                    return (
                      <div className="leading-tighter flex flex-col items-center justify-center">
                        <span className="text-muted-foreground">{label}</span>
                        <div className="flex items-center p-0">
                          <Dot className="size-8 text-green-500" />
                          <span className="font-semibold">
                            {formatCurrency(Number(value))}
                          </span>
                        </div>
                      </div>
                    )
                  }}
                />
              }
            />

            <Area
              type="monotone"
              dataKey="spending"
              stroke="var(--color-spending)"
              strokeWidth={2.5}
              fill="url(#spendingGradient)"
              fillOpacity={1}
              dot={{
                r: 3,
                fill: "var(--color-spending)",
                strokeWidth: 2,
                stroke: "var(--color-spending)",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
