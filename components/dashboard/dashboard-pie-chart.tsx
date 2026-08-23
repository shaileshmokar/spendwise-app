"use client"

import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

import { dashboardMonthFilters } from "@/data/dashboard"
import { SpendingByCategory } from "@/type/dashboard"

const chartConfig = {
  amount: {
    label: "Expenses",
    color: "var(--chart-7)",
  },
  food: {
    label: "Food",
    color: "var(--chart-1)",
  },
  shopping: {
    label: "Shopping",
    color: "var(--chart-2)",
  },
  bills: {
    label: "Bills",
    color: "var(--chart-3)",
  },
  transport: {
    label: "Transport",
    color: "var(--chart-4)",
  },
  entertainment: {
    label: "Entertainment",
    color: "var(--chart-5)",
  },
  others: {
    label: "Others",
    color: "var(--chart-6)",
  },
} satisfies ChartConfig

type DashboardPieDataProps = {
  data: SpendingByCategory[]
}

export function DashboardPieChart({ data }: DashboardPieDataProps) {
  const totalExpenses = data.reduce((total, item) => total + item.amount, 0)

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle>Expenses by Category</CardTitle>

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
      <CardContent className="flex flex-col items-center gap-4">
        <ChartContainer
          config={chartConfig}
          className="aspect-square w-full max-w-55"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  formatter={(value, name, item) => (
                    <div className="flex w-full items-center justify-between gap-8">
                      <div className="flex items-center gap-2">
                        <span
                          className="size-2.5 rounded-xs"
                          style={{
                            backgroundColor: item.color,
                          }}
                        />

                        <span className="font-medium">
                          {chartConfig[name as keyof typeof chartConfig]
                            ?.label ?? name}
                        </span>
                      </div>

                      <span className="font-medium tabular-nums">
                        ₹{Number(value).toLocaleString("en-IN")}
                      </span>
                    </div>
                  )}
                />
              }
            />

            <Pie
              data={data}
              dataKey="amount"
              nameKey="category"
              innerRadius="60%"
              outerRadius="85%"
              strokeWidth={4}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-xl font-bold"
                        >
                          ₹{totalExpenses.toLocaleString("en-IN")}
                        </tspan>

                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 22}
                          className="fill-muted-foreground text-xs"
                        >
                          Total Expenses
                        </tspan>
                      </text>
                    )
                  }

                  return null
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>

        {/* Legend */}
        <div className="grid w-full grid-cols-2 gap-x-6 gap-y-3 px-2">
          {data.map((item) => {
            const config =
              chartConfig[item.category as keyof typeof chartConfig]

            return (
              <div
                key={item.category}
                className="flex items-center justify-between gap-2 text-sm"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className="size-2.5 shrink-0 rounded-xs"
                    style={{
                      backgroundColor: config.color,
                    }}
                  />

                  <span className="truncate">{config.label}</span>
                </div>

                <span className="shrink-0 font-medium tabular-nums">
                  ₹{item.amount.toLocaleString("en-IN")}
                </span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
