"use client"

import { MoreVertical } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import RecentContributions from "./recent-contributions"
import { colorStyles } from "@/type/goals"
import { goalsList } from "@/data/goals"
import { formatCurrency } from "@/lib/utils"

const getPercentage = (saved: number, target: number) => {
  return Math.round((saved / target) * 100)
}

export default function GoalsList() {
  return (
    <section className="space-y-5">
      {/* Main Layout */}
      <div className="grid gap-5 lg:grid-cols-[minmax(0,3fr)_minmax(280px,1fr)]">
        {/* LEFT — Goals */}
        <div className="min-w-0 space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-tight">My Goals</h2>

            <Button
              variant="ghost"
              className="h-auto gap-1 px-0 text-sm font-medium text-primary hover:bg-transparent hover:text-primary"
            >
              View All
              <span className="text-lg leading-none">›</span>
            </Button>
          </div>

          {/* Goals Grid */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {goalsList.map((goal) => {
              const Icon = goal.icon
              const percentage = getPercentage(goal.saved, goal.target)
              const styles = colorStyles[goal.color]

              return (
                <Card
                  key={goal.id}
                  className="overflow-hidden transition-shadow hover:shadow-md"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      {/* Goal Icon */}
                      <div
                        className={`flex size-14 items-center justify-center rounded-xl ${styles.icon}`}
                      >
                        <Icon
                          className={`size-7 ${styles.iconColor}`}
                          strokeWidth={2}
                        />
                      </div>

                      {/* Actions */}
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8 text-muted-foreground hover:bg-muted"
                            >
                              <MoreVertical className="size-4" />
                              <span className="sr-only">Goal actions</span>
                            </Button>
                          }
                        />

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit Goal</DropdownMenuItem>

                          <DropdownMenuItem>Add Money</DropdownMenuItem>

                          <DropdownMenuSeparator />

                          <DropdownMenuItem className="text-destructive focus:text-destructive">
                            Delete Goal
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    {/* Title + Percentage */}
                    <div className="flex items-center justify-between gap-2">
                      <CardTitle className="truncate text-base font-semibold">
                        {goal.title}
                      </CardTitle>

                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${styles.badge}`}
                      >
                        {percentage}%
                      </span>
                    </div>

                    {/* Amount */}
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">
                        {formatCurrency(goal.saved)}
                      </span>{" "}
                      of {formatCurrency(goal.target)}
                    </div>

                    {/* Progress */}
                    <div className="relative">
                      <Progress value={percentage} className="h-1.5 bg-muted" />

                      <div
                        className={`absolute top-0 left-0 h-1.5 rounded-full ${styles.progress}`}
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>

                    {/* Due Date */}
                    <div className="flex items-center gap-1.5 pt-1 text-xs text-muted-foreground">
                      <span>▣</span>
                      <span>Due: {goal.dueDate}</span>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Savings Tip */}
          {/* <Card className="border-purple-200 bg-purple-50/70">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-purple-100">
                <Sparkles className="size-6 text-purple-600" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">
                  Tip: Automate your savings
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Set up recurring transfers to stay consistent with your goals.
                </p>
              </div>

              <Button
                variant="outline"
                className="hidden shrink-0 bg-background sm:flex"
              >
                Set Up Now
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="size-8 shrink-0 text-purple-600 hover:bg-purple-100 hover:text-purple-700"
              >
                <X className="size-5" />
                <span className="sr-only">Dismiss tip</span>
              </Button>
            </CardContent>
          </Card> */}
        </div>

        {/* RIGHT — Recent Contributions */}
        <div className="min-w-0 sm:mt-12">
          <RecentContributions />
        </div>
      </div>
    </section>
  )
}
