"use client"

import * as React from "react"
import {
  ArrowUp,
  BarChart3,
  Bell,
  ChevronRight,
  MoreVertical,
  Pencil,
  Plus,
  Settings,
  ShoppingCart,
  Target,
  Trash2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { BudgetStatus, Budget, colorStyles } from "@/type/budgets"
import { formatCurrency } from "@/lib/utils"
import { budgets } from "@/data/budgets"
import { Separator } from "../ui/separator"

const getProgress = (budget: Budget) => {
  return Math.round((budget.spent / budget.budget) * 100)
}

const getStatus = (budget: Budget): BudgetStatus => {
  const percentage = getProgress(budget)

  if (percentage > 100) return "over-budget"
  if (percentage >= 70) return "on-track"

  return "under-budget"
}

const statusConfig: Record<
  BudgetStatus,
  {
    label: string
    className: string
  }
> = {
  "on-track": {
    label: "On Track",
    className: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
  },
  "over-budget": {
    label: "Over Budget",
    className: "bg-red-100 text-red-600 hover:bg-red-100",
  },
  "under-budget": {
    label: "Under Budget",
    className: "bg-orange-100 text-orange-600 hover:bg-orange-100",
  },
}

export default function BudgetList() {
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [sortBy, setSortBy] = React.useState("progress")
  const [view, setView] = React.useState<"list" | "grid">("list")

  const filteredBudgets = React.useMemo(() => {
    let result = [...budgets]

    if (statusFilter !== "all") {
      result = result.filter((budget) => getStatus(budget) === statusFilter)
    }

    if (sortBy === "progress") {
      result.sort((a, b) => getProgress(b) - getProgress(a))
    }

    if (sortBy === "amount") {
      result.sort((a, b) => b.spent - a.spent)
    }

    if (sortBy === "name") {
      result.sort((a, b) => a.category.localeCompare(b.category))
    }

    return result
  }, [statusFilter, sortBy])

  const totalBudget = budgets.reduce((sum, item) => sum + item.budget, 0)

  const totalSpent = budgets.reduce((sum, item) => sum + item.spent, 0)

  const categoriesWithinBudget = budgets.filter(
    (item) => item.spent <= item.budget
  ).length

  return (
    <section className="space-y-5">
      {/* Main Layout */}
      <div className="grid gap-5 xl:grid-cols-12">
        {/* Left */}
        <div className="space-y-4 xl:col-span-8">
          {/* Budget Header */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">
                Budget by Category
              </h2>

              {/* <p className="text-sm text-muted-foreground">
                Track your spending against your monthly budgets.
              </p> */}
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex rounded-md border p-0.5">
                {[
                  { label: "All", value: "all" },
                  {
                    label: "Over Budget",
                    value: "over-budget",
                  },
                  {
                    label: "On Track",
                    value: "on-track",
                  },
                  {
                    label: "Under Budget",
                    value: "under-budget",
                  },
                ].map((item) => (
                  <Button
                    key={item.value}
                    variant={statusFilter === item.value ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setStatusFilter(item.value)}
                    className="h-7 px-3 text-xs"
                  >
                    {item.label}
                  </Button>
                ))}
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-8 w-36 text-xs">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="progress">Sort by: Progress</SelectItem>

                  <SelectItem value="amount">Sort by: Amount</SelectItem>

                  <SelectItem value="name">Sort by: Name</SelectItem>
                </SelectContent>
              </Select>

              {/* View Toggle */}
              <div className="flex rounded-md border p-0.5">
                <Button
                  variant={view === "list" ? "default" : "ghost"}
                  size="icon"
                  className="size-7"
                  onClick={() => setView("list")}
                >
                  <BarChart3 className="size-3.5" />
                </Button>

                <Button
                  variant={view === "grid" ? "default" : "ghost"}
                  size="icon"
                  className="size-7"
                  onClick={() => setView("grid")}
                >
                  <ShoppingCart className="size-3.5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Budget Table */}
          <Card className="overflow-hidden">
            {view === "list" ? (
              <>
                {/* Table Header */}
                <div className="hidden grid-cols-[1.5fr_0.8fr_0.8fr_0.8fr_1.5fr_0.8fr_40px] items-center gap-4 border-b bg-muted/20 px-4 py-3 text-xs font-medium text-muted-foreground md:grid">
                  <span>Category</span>
                  <span>Budget</span>
                  <span>Spent</span>
                  <span>Remaining</span>
                  <span>Progress</span>
                  <span>Status</span>
                  <span />
                </div>

                <div className="divide-y">
                  {filteredBudgets.map((budget) => {
                    const Icon = budget.icon
                    const percentage = getProgress(budget)
                    const status = getStatus(budget)
                    const styles = colorStyles[budget.color]
                    const remaining = budget.budget - budget.spent

                    return (
                      <div
                        key={budget.id}
                        className="grid gap-3 px-4 py-3.5 md:grid-cols-[1.5fr_0.8fr_0.8fr_0.8fr_1.5fr_0.8fr_40px] md:items-center md:gap-4"
                      >
                        {/* Category */}
                        <div className="flex min-w-0 items-center gap-3">
                          <div
                            className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${styles.icon}`}
                          >
                            <Icon className={`size-4.5 ${styles.iconColor}`} />
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold tracking-wide">
                              {budget.category}
                            </p>

                            <p className="text-xs text-muted-foreground">
                              {budget.transactions} transactions
                            </p>
                          </div>
                        </div>

                        {/* Mobile Details */}
                        <div className="grid grid-cols-3 gap-2 md:contents">
                          <div>
                            <p className="text-[10px] text-muted-foreground md:hidden">
                              Budget
                            </p>
                            <p className="text-sm font-medium">
                              {formatCurrency(budget.budget)}
                            </p>
                          </div>

                          <div>
                            <p className="text-[10px] text-muted-foreground md:hidden">
                              Spent
                            </p>
                            <p className="text-sm font-medium">
                              {formatCurrency(budget.spent)}
                            </p>
                          </div>

                          <div>
                            <p className="text-[10px] text-muted-foreground md:hidden">
                              Remaining
                            </p>

                            <p
                              className={`text-sm font-semibold ${
                                remaining < 0
                                  ? "text-red-500"
                                  : "text-emerald-600"
                              }`}
                            >
                              {remaining < 0 ? "−" : ""}
                              {formatCurrency(Math.abs(remaining))}
                            </p>
                          </div>
                        </div>

                        {/* Progress */}
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <div className="relative flex-1">
                              <Progress
                                value={Math.min(percentage, 100)}
                                className="h-1.5 bg-muted"
                              />

                              <div
                                className={`absolute top-0 left-0 h-1.5 rounded-full ${styles.progress}`}
                                style={{
                                  width: `${Math.min(percentage, 100)}%`,
                                }}
                              />
                            </div>

                            <span className="w-10 text-right text-xs font-medium">
                              {percentage}%
                            </span>
                          </div>
                        </div>

                        {/* Status */}
                        <div>
                          <Badge
                            variant="secondary"
                            className={`text-[10px] ${statusConfig[status].className}`}
                          >
                            {statusConfig[status].label}
                          </Badge>
                        </div>

                        {/* Actions */}
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            render={
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-8"
                              >
                                <MoreVertical className="size-4" />
                              </Button>
                            }
                          />

                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Pencil />
                              Edit Budget
                            </DropdownMenuItem>

                            <DropdownMenuItem>
                              <BarChart3 />
                              View Details
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem className="text-destructive">
                              <Trash2 />
                              Delete Budget
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    )
                  })}
                </div>
              </>
            ) : (
              /* Grid View */
              <div className="grid gap-4 p-4 sm:grid-cols-2">
                {filteredBudgets.map((budget) => {
                  const Icon = budget.icon
                  const percentage = getProgress(budget)
                  const status = getStatus(budget)
                  const styles = colorStyles[budget.color]

                  return (
                    <Card key={budget.id}>
                      <CardContent className="space-y-4 p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex size-10 items-center justify-center rounded-lg ${styles.icon}`}
                            >
                              <Icon className={`size-5 ${styles.iconColor}`} />
                            </div>

                            <div>
                              <p className="text-sm font-semibold">
                                {budget.category}
                              </p>

                              <p className="text-xs text-muted-foreground">
                                {budget.transactions} transactions
                              </p>
                            </div>
                          </div>

                          <Badge
                            variant="secondary"
                            className={`text-[10px] ${statusConfig[status].className}`}
                          >
                            {statusConfig[status].label}
                          </Badge>
                        </div>

                        <div className="flex justify-between text-sm">
                          <span>{formatCurrency(budget.spent)}</span>

                          <span className="text-muted-foreground">
                            of {formatCurrency(budget.budget)}
                          </span>
                        </div>

                        <div className="relative">
                          <Progress
                            value={Math.min(percentage, 100)}
                            className="h-2"
                          />

                          <div
                            className={`absolute top-0 left-0 h-2 rounded-full ${styles.progress}`}
                            style={{
                              width: `${Math.min(percentage, 100)}%`,
                            }}
                          />
                        </div>

                        <div className="text-right text-xs font-medium">
                          {percentage}%
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4 sm:mt-12 xl:col-span-4">
          {/* Budget Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Budget Overview</CardTitle>
            </CardHeader>
            <Separator />

            <CardContent>
              <div className="flex flex-col justify-evenly gap-5">
                {/* Donut */}
                <div
                  className="relative flex size-48 shrink-0 items-center justify-center rounded-full"
                  style={{
                    background:
                      "conic-gradient(#7c3aed 0% 21.2%, #f59e0b 21.2% 36.5%, #22c55e 36.5% 47.9%, #3b82f6 47.9% 56.8%, #ec4899 56.8% 64.4%, #fbbf24 64.4% 70.6%, #14b8a6 70.6% 74%, #8b5cf6 74% 76.6%, #9ca3af 76.6% 100%)",
                  }}
                >
                  <div className="flex size-20 flex-col items-center justify-center rounded-full bg-background">
                    <span className="text-base font-bold">
                      {formatCurrency(totalSpent)}
                    </span>

                    <span className="text-xs text-muted-foreground">Spent</span>
                  </div>
                </div>

                {/* Legend */}
                <div className="min-w-0 flex-1 space-y-2">
                  {[
                    ["Housing", "₹14,560", "21.2%"],
                    ["Food & Dining", "₹10,480", "15.3%"],
                    ["Transport", "₹7,850", "11.4%"],
                    ["Shopping", "₹6,120", "8.9%"],
                    ["Entertainment", "₹5,230", "7.6%"],
                    ["Utilities", "₹4,190", "6.1%"],
                    ["Health & Fitness", "₹2,320", "3.4%"],
                    ["Education", "₹1,790", "2.6%"],
                    ["Others", "₹16,000", "23.5%"],
                  ].map(([name, amount, percentage], index) => (
                    <div
                      key={name}
                      className="flex items-center gap-2 text-[10px]"
                    >
                      <span
                        className="size-2 shrink-0 rounded-sm"
                        style={{
                          background: [
                            "#7c3aed",
                            "#f59e0b",
                            "#22c55e",
                            "#3b82f6",
                            "#ec4899",
                            "#fbbf24",
                            "#14b8a6",
                            "#8b5cf6",
                            "#9ca3af",
                          ][index],
                        }}
                      />

                      <span className="min-w-0 flex-1 truncate text-sm">
                        {name}
                      </span>

                      <span className="text-sm font-medium">{amount}</span>

                      <span className="text-sm text-muted-foreground">
                        {percentage}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* <Button
                variant="ghost"
                className="mt-4 w-full text-xs text-primary hover:text-primary"
              >
                View Full Breakdown
                <ChevronRight className="size-4" />
              </Button> */}
            </CardContent>
          </Card>

          {/* Budget Alerts */}
          {/* <Card>
            <CardHeader>
              <CardTitle className="text-sm">Budget Alerts</CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">
              <div className="flex items-center gap-3 rounded-lg bg-red-50 p-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-red-100">
                  <ArrowUp className="size-4 text-red-500" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-red-600">
                    Entertainment is over budget
                  </p>

                  <p className="text-[10px] text-muted-foreground">
                    You&apos;ve exceeded your budget by ₹230
                  </p>
                </div>

                <ChevronRight className="size-4 text-red-500" />
              </div>

              <div className="flex items-center gap-3 rounded-lg bg-orange-50 p-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-orange-100">
                  <Bell className="size-4 text-orange-500" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-orange-600">
                    Utilities is at 84%
                  </p>

                  <p className="text-[10px] text-muted-foreground">
                    You&apos;ve used 84% of your budget
                  </p>
                </div>

                <ChevronRight className="size-4 text-orange-500" />
              </div>

              <div className="flex items-center gap-3 rounded-lg bg-blue-50 p-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-100">
                  <Bell className="size-4 text-blue-500" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-blue-600">
                    2 upcoming bills
                  </p>

                  <p className="text-[10px] text-muted-foreground">
                    Upcoming bills may affect your budgets
                  </p>
                </div>

                <ChevronRight className="size-4 text-blue-500" />
              </div>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </section>
  )
}
