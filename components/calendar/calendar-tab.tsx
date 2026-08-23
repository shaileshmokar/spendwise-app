"use client"

import * as React from "react"
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  CreditCard,
  Droplets,
  GraduationCap,
  HeartPulse,
  Home,
  Lightbulb,
  MoreHorizontal,
  Phone,
  Plane,
  ShoppingCart,
  Smartphone,
  Tv,
  Utensils,
  Wallet,
  Wifi,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

type CalendarView = "month" | "week" | "list"

type TransactionType = "income" | "expense"

type CalendarEvent = {
  id: number
  date: string
  title: string
  amount: number
  type: TransactionType
  icon: React.ElementType
  color: string
}

type UpcomingItem = {
  id: number
  title: string
  date: string
  amount?: number
  icon: React.ElementType
  color: string
}

type Bill = {
  id: number
  title: string
  date: string
  amount: number
  status: "overdue" | "paid" | "due-soon" | "upcoming"
  icon: React.ElementType
  color: string
}

/* -------------------------------------------------------------------------- */
/* Mock Data                                                                  */
/* -------------------------------------------------------------------------- */

const calendarEvents: CalendarEvent[] = [
  {
    id: 1,
    date: "2024-05-01",
    title: "Salary",
    amount: 85000,
    type: "income",
    icon: ArrowDown,
    color: "green",
  },
  {
    id: 2,
    date: "2024-05-01",
    title: "Rent",
    amount: 12000,
    type: "expense",
    icon: Home,
    color: "pink",
  },
  {
    id: 3,
    date: "2024-05-03",
    title: "Swiggy",
    amount: 650,
    type: "expense",
    icon: Utensils,
    color: "orange",
  },
  {
    id: 4,
    date: "2024-05-06",
    title: "Grocery",
    amount: 1250,
    type: "expense",
    icon: ShoppingCart,
    color: "green",
  },
  {
    id: 5,
    date: "2024-05-08",
    title: "Freelance",
    amount: 8500,
    type: "income",
    icon: Wallet,
    color: "blue",
  },
  {
    id: 6,
    date: "2024-05-10",
    title: "Electricity Bill",
    amount: 2350,
    type: "expense",
    icon: Zap,
    color: "orange",
  },
  {
    id: 7,
    date: "2024-05-10",
    title: "Netflix",
    amount: 649,
    type: "expense",
    icon: Tv,
    color: "red",
  },
  {
    id: 8,
    date: "2024-05-13",
    title: "Fuel",
    amount: 1800,
    type: "expense",
    icon: Smartphone,
    color: "pink",
  },
  {
    id: 9,
    date: "2024-05-15",
    title: "Salary",
    amount: 85000,
    type: "income",
    icon: ArrowDown,
    color: "green",
  },
  {
    id: 10,
    date: "2024-05-15",
    title: "Internet Bill",
    amount: 999,
    type: "expense",
    icon: Wifi,
    color: "pink",
  },
  {
    id: 11,
    date: "2024-05-16",
    title: "Zomato",
    amount: 780,
    type: "expense",
    icon: Utensils,
    color: "red",
  },
  {
    id: 12,
    date: "2024-05-18",
    title: "Credit Card Bill",
    amount: 5230,
    type: "expense",
    icon: CreditCard,
    color: "purple",
  },
  {
    id: 13,
    date: "2024-05-20",
    title: "Shopping",
    amount: 2499,
    type: "expense",
    icon: ShoppingCart,
    color: "purple",
  },
  {
    id: 14,
    date: "2024-05-23",
    title: "Phone Bill",
    amount: 699,
    type: "expense",
    icon: Phone,
    color: "blue",
  },
  {
    id: 15,
    date: "2024-05-28",
    title: "Mutual Fund SIP",
    amount: 3000,
    type: "expense",
    icon: CircleDollarSign,
    color: "blue",
  },
  {
    id: 16,
    date: "2024-05-31",
    title: "Water Bill",
    amount: 650,
    type: "expense",
    icon: Droplets,
    color: "blue",
  },
]

const upcomingItems: UpcomingItem[] = [
  {
    id: 1,
    title: "Swiggy",
    date: "May 17, 2024",
    amount: 650,
    icon: Utensils,
    color: "orange",
  },
  {
    id: 2,
    title: "Credit Card Bill",
    date: "May 18, 2024",
    amount: 5230,
    icon: CreditCard,
    color: "purple",
  },
  {
    id: 3,
    title: "Phone Bill",
    date: "May 23, 2024",
    amount: 699,
    icon: Phone,
    color: "blue",
  },
]

const reminders: UpcomingItem[] = [
  {
    id: 1,
    title: "Car Insurance Renewal",
    date: "May 28, 2024",
    icon: CircleDollarSign,
    color: "green",
  },
  {
    id: 2,
    title: "Health Checkup",
    date: "June 2, 2024",
    icon: HeartPulse,
    color: "blue",
  },
  {
    id: 3,
    title: "Vacation Trip",
    date: "June 15, 2024",
    icon: Plane,
    color: "purple",
  },
]

const bills: Bill[] = [
  {
    id: 1,
    title: "Electricity Bill",
    date: "May 10, 2024",
    amount: 2350,
    status: "overdue",
    icon: Zap,
    color: "orange",
  },
  {
    id: 2,
    title: "Internet Bill",
    date: "May 15, 2024",
    amount: 999,
    status: "paid",
    icon: Wifi,
    color: "pink",
  },
  {
    id: 3,
    title: "Credit Card Bill",
    date: "May 18, 2024",
    amount: 5230,
    status: "due-soon",
    icon: CreditCard,
    color: "purple",
  },
  {
    id: 4,
    title: "Water Bill",
    date: "May 31, 2024",
    amount: 650,
    status: "upcoming",
    icon: Droplets,
    color: "blue",
  },
]

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const formatCurrency = (value: number) => `₹${value.toLocaleString("en-IN")}`

const getEventsForDate = (date: Date) => {
  const key = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-")

  return calendarEvents.filter((event) => event.date === key)
}

const getCalendarDays = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1)
  const startDay = firstDay.getDay()

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const previousMonthDays = new Date(year, month, 0).getDate()

  const days: Date[] = []

  // Previous month
  for (let i = startDay - 1; i >= 0; i--) {
    days.push(new Date(year, month - 1, previousMonthDays - i))
  }

  // Current month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(new Date(year, month, day))
  }

  // Next month
  let nextDay = 1

  while (days.length < 42) {
    days.push(new Date(year, month + 1, nextDay))
    nextDay++
  }

  return days
}

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate()

const colorClasses: Record<
  string,
  {
    icon: string
    iconText: string
    amountIncome: string
    amountExpense: string
  }
> = {
  green: {
    icon: "bg-emerald-50",
    iconText: "text-emerald-500",
    amountIncome: "text-emerald-500",
    amountExpense: "text-red-500",
  },
  orange: {
    icon: "bg-orange-50",
    iconText: "text-orange-500",
    amountIncome: "text-emerald-500",
    amountExpense: "text-red-500",
  },
  pink: {
    icon: "bg-pink-50",
    iconText: "text-pink-500",
    amountIncome: "text-emerald-500",
    amountExpense: "text-red-500",
  },
  purple: {
    icon: "bg-purple-50",
    iconText: "text-purple-500",
    amountIncome: "text-emerald-500",
    amountExpense: "text-red-500",
  },
  blue: {
    icon: "bg-blue-50",
    iconText: "text-blue-500",
    amountIncome: "text-emerald-500",
    amountExpense: "text-red-500",
  },
  red: {
    icon: "bg-red-50",
    iconText: "text-red-500",
    amountIncome: "text-emerald-500",
    amountExpense: "text-red-500",
  },
}

/* -------------------------------------------------------------------------- */
/* Main Component                                                             */
/* -------------------------------------------------------------------------- */

export default function CalendarTab() {
  const [currentDate, setCurrentDate] = React.useState(new Date(2024, 4, 15))

  const [view, setView] = React.useState<CalendarView>("month")

  const today = new Date(2024, 4, 15)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const calendarDays = getCalendarDays(year, month)

  const monthName = currentDate.toLocaleDateString("en-US", {
    month: "long",
  })

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const goToToday = () => {
    setCurrentDate(today)
  }

  return (
    <section className="space-y-4">
      {/* ------------------------------------------------------------------ */}
      {/* Calendar Header                                                    */}
      {/* ------------------------------------------------------------------ */}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {/* Previous */}
          <Button
            variant="outline"
            size="icon"
            className="size-9"
            onClick={goToPreviousMonth}
          >
            <ArrowLeft className="size-4" />
          </Button>

          {/* Next */}
          <Button
            variant="outline"
            size="icon"
            className="size-9"
            onClick={goToNextMonth}
          >
            <ArrowRight className="size-4" />
          </Button>

          {/* Today */}
          <Button variant="outline" className="h-9 px-4" onClick={goToToday}>
            Today
          </Button>

          {/* Month */}
          <Button
            variant="ghost"
            className="h-9 gap-1 px-2 text-base font-semibold"
          >
            {monthName} {year}
            <ChevronDown className="size-4 text-muted-foreground" />
          </Button>
        </div>

        {/* View Switcher */}
        <div className="flex rounded-md border bg-background">
          {(["month", "week", "list"] as CalendarView[]).map((item) => (
            <Button
              key={item}
              variant={view === item ? "default" : "ghost"}
              className={cn(
                "h-9 rounded-none px-5 capitalize first:rounded-l-md last:rounded-r-md",
                view === item && "shadow-none"
              )}
              onClick={() => setView(item)}
            >
              {item}
            </Button>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Main Layout                                                        */}
      {/* ------------------------------------------------------------------ */}

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_240px]">
        {/* Calendar */}
        <Card className="overflow-hidden">
          {view === "month" && (
            <MonthCalendar
              calendarDays={calendarDays}
              currentDate={currentDate}
              today={today}
            />
          )}

          {view === "week" && (
            <WeekView currentDate={currentDate} today={today} />
          )}

          {view === "list" && <ListView currentDate={currentDate} />}
        </Card>

        {/* Right Sidebar */}
        <div className="space-y-4">
          <MonthlySummary />

          <UpcomingSection
            title="Upcoming (Next 7 Days)"
            items={upcomingItems}
            showAmount
          />

          <UpcomingSection title="Upcoming Reminders" items={reminders} />
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Bills                                                               */}
      {/* ------------------------------------------------------------------ */}

      <BillsSection />
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/* Month Calendar                                                             */
/* -------------------------------------------------------------------------- */

function MonthCalendar({
  calendarDays,
  currentDate,
  today,
}: {
  calendarDays: Date[]
  currentDate: Date
  today: Date
}) {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[700px]">
        {/* Week Days */}
        <div className="grid grid-cols-7 border-b">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="border-r px-3 py-2 text-center text-xs font-semibold text-muted-foreground last:border-r-0"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7">
          {calendarDays.map((date, index) => {
            const events = getEventsForDate(date)

            const isCurrentMonth = date.getMonth() === currentDate.getMonth()

            const isToday = isSameDay(date, today)

            return (
              <div
                key={index}
                className={cn(
                  "min-h-[110px] border-r border-b p-2 last:border-r-0",
                  !isCurrentMonth && "bg-muted/20",
                  isToday && "bg-primary/[0.03]"
                )}
              >
                {/* Date */}
                <div className="mb-1 flex">
                  <span
                    className={cn(
                      "flex size-6 items-center justify-center rounded-full text-xs font-medium",
                      !isCurrentMonth && "text-muted-foreground/50",
                      isToday && "bg-primary text-primary-foreground"
                    )}
                  >
                    {date.getDate()}
                  </span>
                </div>

                {/* Events */}
                <div className="space-y-1">
                  {events.map((event) => {
                    const Icon = event.icon
                    const styles =
                      colorClasses[event.color] ?? colorClasses.blue

                    return (
                      <button
                        key={event.id}
                        className="group flex w-full min-w-0 items-center gap-1 text-left"
                      >
                        <div
                          className={cn(
                            "flex size-5 shrink-0 items-center justify-center rounded",
                            styles.icon
                          )}
                        >
                          <Icon className={cn("size-3", styles.iconText)} />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-[10px] font-medium">
                            {event.title}
                          </p>

                          <p
                            className={cn(
                              "text-[10px] font-semibold",
                              event.type === "income"
                                ? styles.amountIncome
                                : styles.amountExpense
                            )}
                          >
                            {event.type === "income" ? "+" : "-"}
                            {formatCurrency(event.amount)}
                          </p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Week View                                                                  */
/* -------------------------------------------------------------------------- */

function WeekView({ currentDate, today }: { currentDate: Date; today: Date }) {
  const startOfWeek = new Date(currentDate)
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())

  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(startOfWeek)
    date.setDate(startOfWeek.getDate() + index)
    return date
  })

  return (
    <div className="overflow-x-auto">
      <div className="grid min-w-[700px] grid-cols-7">
        {days.map((date) => {
          const events = getEventsForDate(date)

          return (
            <div
              key={date.toISOString()}
              className="min-h-[500px] border-r p-3 last:border-r-0"
            >
              <div className="mb-4 text-center">
                <p className="text-xs font-medium text-muted-foreground">
                  {date.toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </p>

                <div
                  className={cn(
                    "mx-auto mt-1 flex size-8 items-center justify-center rounded-full text-sm font-semibold",
                    isSameDay(date, today) &&
                      "bg-primary text-primary-foreground"
                  )}
                >
                  {date.getDate()}
                </div>
              </div>

              <div className="space-y-2">
                {events.map((event) => (
                  <CalendarEventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* List View                                                                  */
/* -------------------------------------------------------------------------- */

function ListView({ currentDate }: { currentDate: Date }) {
  const monthEvents = calendarEvents.filter((event) => {
    const eventDate = new Date(event.date)

    return (
      eventDate.getMonth() === currentDate.getMonth() &&
      eventDate.getFullYear() === currentDate.getFullYear()
    )
  })

  return (
    <div className="divide-y">
      {monthEvents.map((event) => (
        <div key={event.id} className="flex items-center gap-4 p-4">
          <div className="w-20 shrink-0">
            <p className="text-sm font-semibold">
              {new Date(event.date).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
              })}
            </p>
          </div>

          <CalendarEventCard event={event} className="flex-1" />
        </div>
      ))}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Event Card                                                                 */
/* -------------------------------------------------------------------------- */

function CalendarEventCard({
  event,
  className,
}: {
  event: CalendarEvent
  className?: string
}) {
  const Icon = event.icon
  const styles = colorClasses[event.color] ?? colorClasses.blue

  return (
    <div className={cn("rounded-lg border bg-background p-2", className)}>
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-lg",
            styles.icon
          )}
        >
          <Icon className={cn("size-4", styles.iconText)} />
        </div>

        <div className="min-w-0">
          <p className="truncate text-xs font-semibold">{event.title}</p>

          <p
            className={cn(
              "text-xs font-semibold",
              event.type === "income"
                ? styles.amountIncome
                : styles.amountExpense
            )}
          >
            {event.type === "income" ? "+" : "-"}
            {formatCurrency(event.amount)}
          </p>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Monthly Summary                                                            */
/* -------------------------------------------------------------------------- */

function MonthlySummary() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          Monthly Summary
          <span className="text-xs text-muted-foreground">ⓘ</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <SummaryRow
          icon={ArrowDown}
          title="Income"
          value="₹1,20,850"
          color="green"
        />

        <SummaryRow
          icon={ArrowUp}
          title="Expenses"
          value="₹52,400"
          color="pink"
        />

        <div className="border-t pt-3">
          <SummaryRow
            icon={Wallet}
            title="Net Savings"
            value="₹68,450"
            color="purple"
          />
        </div>
      </CardContent>
    </Card>
  )
}

function SummaryRow({
  icon: Icon,
  title,
  value,
  color,
}: {
  icon: React.ElementType
  title: string
  value: string
  color: string
}) {
  const styles = colorClasses[color] ?? colorClasses.blue

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "flex size-8 items-center justify-center rounded-full",
            styles.icon
          )}
        >
          <Icon className={cn("size-4", styles.iconText)} />
        </div>

        <span className="text-xs text-muted-foreground">{title}</span>
      </div>

      <span className="text-sm font-semibold">{value}</span>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Upcoming                                                                  */
/* -------------------------------------------------------------------------- */

function UpcomingSection({
  title,
  items,
  showAmount = false,
}: {
  title: string
  items: UpcomingItem[]
  showAmount?: boolean
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">{title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon
          const styles = colorClasses[item.color] ?? colorClasses.blue

          return (
            <div
              key={item.id}
              className="flex items-center gap-2 border-b py-3 last:border-b-0"
            >
              <div
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full",
                  styles.icon
                )}
              >
                <Icon className={cn("size-4", styles.iconText)} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold">{item.title}</p>

                <p className="text-[11px] text-muted-foreground">{item.date}</p>
              </div>

              {showAmount && item.amount && (
                <span className="shrink-0 text-xs font-semibold text-red-500">
                  -{formatCurrency(item.amount)}
                </span>
              )}
            </div>
          )
        })}

        <Button
          variant="ghost"
          className="mt-2 h-auto w-full justify-start gap-1 px-0 text-xs font-medium text-primary hover:bg-transparent"
        >
          View all
          <ChevronRight className="size-3" />
        </Button>
      </CardContent>
    </Card>
  )
}

/* -------------------------------------------------------------------------- */
/* Bills                                                                      */
/* -------------------------------------------------------------------------- */

function BillsSection() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-sm">Bills & Due Dates</CardTitle>

        <Button
          variant="ghost"
          className="h-auto gap-1 px-0 text-xs text-primary hover:bg-transparent"
        >
          View all bills
          <ChevronRight className="size-3" />
        </Button>
      </CardHeader>

      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {bills.map((bill) => {
            const Icon = bill.icon
            const styles = colorClasses[bill.color] ?? colorClasses.blue

            return (
              <div
                key={bill.id}
                className="flex items-center gap-3 rounded-lg border p-3"
              >
                <div
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-lg",
                    styles.icon
                  )}
                >
                  <Icon className={cn("size-4", styles.iconText)} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-xs font-semibold">
                      {bill.title}
                    </p>

                    <BillStatus status={bill.status} />
                  </div>

                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    {bill.date}
                  </p>
                </div>

                <span
                  className={cn(
                    "shrink-0 text-xs font-semibold",
                    bill.status === "paid" ? "text-emerald-500" : "text-red-500"
                  )}
                >
                  {bill.status === "paid" ? "+" : "-"}
                  {formatCurrency(bill.amount)}
                </span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

function BillStatus({ status }: { status: Bill["status"] }) {
  const config = {
    overdue: {
      label: "Overdue",
      className: "bg-red-50 text-red-500",
    },
    paid: {
      label: "Paid",
      className: "bg-emerald-50 text-emerald-500",
    },
    "due-soon": {
      label: "Due Soon",
      className: "bg-blue-50 text-blue-500",
    },
    upcoming: {
      label: "Upcoming",
      className: "bg-blue-50 text-blue-500",
    },
  }

  const item = config[status]

  return (
    <span
      className={cn(
        "hidden rounded-full px-1.5 py-0.5 text-[9px] font-medium sm:inline-flex",
        item.className
      )}
    >
      {item.label}
    </span>
  )
}
