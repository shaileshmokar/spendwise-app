"use client"

import { useMemo, useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { formatCurrency } from "@/lib/utils"
import { transactions } from "@/data/calendar"
import { monthNames } from "@/type/calendar"

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 7, 15))
  const [selectedDate, setSelectedDate] = useState("2026-08-15")

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDay = new Date(year, month, 1).getDay()

  const calendarDays = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  const selectedTransactions = useMemo(
    () =>
      transactions.filter((transaction) => transaction.date === selectedDate),
    [selectedDate]
  )

  const monthTransactions = transactions.filter((transaction) => {
    const date = new Date(transaction.date)

    return date.getFullYear() === year && date.getMonth() === month
  })

  const income = monthTransactions
    .filter((transaction) => transaction.type === "income")
    .reduce((sum, transaction) => sum + transaction.amount, 0)

  const expenses = monthTransactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((sum, transaction) => sum + transaction.amount, 0)

  const balance = income - expenses

  function getDateString(day: number) {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`
  }

  function previousMonth() {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  function nextMonth() {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  return (
    <div className="flex flex-1 flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Calendar</h1>
          <p className="text-sm text-muted-foreground">
            Track your income and expenses by date.
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Monthly Income</p>
              <p className="text-2xl font-semibold">{formatCurrency(income)}</p>
            </div>

            <div className="rounded-full bg-green-100 p-3 dark:bg-green-950">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Monthly Expenses</p>
              <p className="mt-1 text-2xl font-semibold">
                {formatCurrency(expenses)}
              </p>
            </div>

            <div className="rounded-full bg-red-100 p-3 dark:bg-red-950">
              <TrendingDown className="h-5 w-5 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Net Balance</p>
              <p className="mt-1 text-2xl font-semibold">
                {formatCurrency(balance)}
              </p>
            </div>

            <div className="rounded-full bg-primary/10 p-3">
              <Wallet className="h-5 w-5 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Calendar + Details */}
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Calendar */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">
                {monthNames[month]} {year}
              </CardTitle>
            </div>

            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon" onClick={previousMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <Button variant="outline" size="icon" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            {/* Weekdays */}
            <div className="grid grid-cols-7 border-b">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="p-3 text-center text-xs font-medium text-muted-foreground"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar */}
            <div className="grid grid-cols-7">
              {calendarDays.map((day, index) => {
                if (!day) {
                  return (
                    <div
                      key={`empty-${index}`}
                      className="min-h-28 border-r border-b border-l bg-muted/20"
                    />
                  )
                }

                const dateString = getDateString(day)

                const dayTransactions = transactions.filter(
                  (transaction) => transaction.date === dateString
                )

                const isSelected = selectedDate === dateString

                const isToday = dateString === "2026-08-15"

                const incomeForDay = dayTransactions
                  .filter((transaction) => transaction.type === "income")
                  .reduce((sum, transaction) => sum + transaction.amount, 0)

                const expenseForDay = dayTransactions
                  .filter((transaction) => transaction.type === "expense")
                  .reduce((sum, transaction) => sum + transaction.amount, 0)

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(dateString)}
                    className={`relative min-h-[110px] border-r border-b border-l p-2 text-left transition-colors hover:bg-muted/50 ${
                      isSelected
                        ? "bg-primary/5 ring-2 ring-primary ring-inset"
                        : ""
                    } `}
                  >
                    <div className="flex justify-between">
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-full text-sm ${
                          isToday ? "bg-primary text-primary-foreground" : ""
                        } `}
                      >
                        {day}
                      </span>

                      {dayTransactions.length > 0 && (
                        <span className="text-[10px] text-muted-foreground">
                          {dayTransactions.length}
                        </span>
                      )}
                    </div>

                    <div className="mt-3 space-y-1">
                      {incomeForDay > 0 && (
                        <div className="truncate rounded bg-green-100 px-1.5 py-1 text-[10px] font-medium text-green-700 dark:bg-green-950 dark:text-green-400">
                          +{formatCurrency(incomeForDay)}
                        </div>
                      )}

                      {expenseForDay > 0 && (
                        <div className="truncate rounded bg-red-100 px-1.5 py-1 text-[10px] font-medium text-red-700 dark:bg-red-950 dark:text-red-400">
                          -{formatCurrency(expenseForDay)}
                        </div>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Selected Day */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-base">
              {new Date(selectedDate).toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </CardTitle>
          </CardHeader>
          <Separator />

          <CardContent>
            {selectedTransactions.length === 0 ? (
              <div className="space-y-3 py-8 text-center">
                <p className="text-sm text-muted-foreground">
                  No transactions on this day.
                </p>

                <Button variant="outline" className="bg-primary text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Transaction
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedTransactions.map((transaction) => (
                  <div key={transaction.id}>
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">
                          {transaction.title}
                        </p>

                        <div className="mt-1 flex items-center gap-2">
                          <Badge variant="secondary" className="text-[10px]">
                            {transaction.category}
                          </Badge>
                        </div>
                      </div>

                      <p
                        className={`text-sm font-semibold whitespace-nowrap ${
                          transaction.type === "income"
                            ? "text-green-600"
                            : "text-red-600"
                        } `}
                      >
                        {transaction.type === "income" ? "+" : "-"}
                        {formatCurrency(transaction.amount)}
                      </p>
                    </div>

                    <Separator className="mt-4" />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
