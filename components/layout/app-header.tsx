"use client"

import * as React from "react"
import Link from "next/link"
import {
  Bell,
  CalendarDays,
  ChevronDown,
  LogOut,
  Plus,
  Search,
  Settings,
  User,
} from "lucide-react"
import type { DateRange } from "react-day-picker"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  formatDateInput,
  formatDateRange,
  formatTypedDate,
  getDateRange,
  parseDateInput,
  type DatePreset,
} from "@/lib/date-range"

/* -------------------------------------------------------------------------- */
/*                              Presets                                       */
/* -------------------------------------------------------------------------- */

const datePresets: {
  label: string
  value: DatePreset
}[] = [
  {
    label: "Today",
    value: "today",
  },
  {
    label: "Yesterday",
    value: "yesterday",
  },
  {
    label: "This Week",
    value: "this-week",
  },
  {
    label: "Last Week",
    value: "last-week",
  },
  {
    label: "This Month",
    value: "this-month",
  },
  {
    label: "Last Month",
    value: "last-month",
  },
  {
    label: "Last 3 Months",
    value: "last-3-months",
  },
  {
    label: "Last 6 Months",
    value: "last-6-months",
  },
  {
    label: "Last 1 Year",
    value: "last-year",
  },
]

/* -------------------------------------------------------------------------- */
/*                            Component                                       */
/* -------------------------------------------------------------------------- */

export function AppHeader() {
  const initialRange = getDateRange("this-month")

  const [date, setDate] = React.useState<DateRange | undefined>(initialRange)

  const [selectedPreset, setSelectedPreset] =
    React.useState<DatePreset>("this-month")

  const [fromInput, setFromInput] = React.useState(
    formatDateInput(initialRange.from)
  )

  const [toInput, setToInput] = React.useState(formatDateInput(initialRange.to))

  /* ---------------------------------------------------------------------- */
  /*                          Sync Inputs                                   */
  /* ---------------------------------------------------------------------- */

  const syncDateInputs = (range: DateRange) => {
    setFromInput(formatDateInput(range.from))
    setToInput(formatDateInput(range.to))
  }

  /* ---------------------------------------------------------------------- */
  /*                         Preset Handler                                 */
  /* ---------------------------------------------------------------------- */

  const handlePresetChange = (preset: DatePreset) => {
    setSelectedPreset(preset)

    if (preset === "custom") {
      return
    }

    const range = getDateRange(preset)

    setDate(range)
    syncDateInputs(range)
  }

  /* ---------------------------------------------------------------------- */
  /*                         Calendar Handler                                */
  /* ---------------------------------------------------------------------- */

  const handleCalendarChange = (range: DateRange | undefined) => {
    if (!range) {
      return
    }

    setSelectedPreset("custom")
    setDate(range)
    syncDateInputs(range)
  }

  /* ---------------------------------------------------------------------- */
  /*                         From Date Input                                */
  /* ---------------------------------------------------------------------- */

  const handleFromDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatTypedDate(event.target.value)

    setFromInput(formatted)
    setSelectedPreset("custom")

    const from = parseDateInput(formatted)

    if (!from) {
      return
    }

    setDate((current) => ({
      from,
      to: current?.to,
    }))
  }

  /* ---------------------------------------------------------------------- */
  /*                           To Date Input                                */
  /* ---------------------------------------------------------------------- */

  const handleToDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatTypedDate(event.target.value)

    setToInput(formatted)
    setSelectedPreset("custom")

    const to = parseDateInput(formatted)

    if (!to) {
      return
    }

    setDate((current) => ({
      from: current?.from,
      to,
    }))
  }

  return (
    <header className="sticky top-0 z-10 flex h-16 w-full items-center gap-3 border-b bg-background px-2 lg:px-2">
      {/* ================================================================== */}
      {/*                            LEFT                                    */}
      {/* ================================================================== */}

      <div className="flex min-w-0 flex-1 items-center gap-2">
        {/* Sidebar Trigger */}
        <SidebarTrigger className="shrink-0 text-primary" />

        {/* Search */}
        <div className="relative w-full max-w-md">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Search transactions, categories..."
            className="h-10 border-0 bg-muted/50 pr-14 pl-10 shadow-none focus-visible:ring-1"
          />

          {/* Keyboard Shortcut */}
          <div className="absolute top-1/2 right-2 hidden -translate-y-1/2 items-center gap-0.5 rounded-md border bg-background px-1.5 py-0.5 text-xs text-muted-foreground sm:flex">
            <span>⌘</span>
            <span>K</span>
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/*                         RIGHT ACTIONS                               */}
      {/* ================================================================== */}

      <div className="flex shrink-0 items-center gap-2">
        {/* ================================================================ */}
        {/*                         DATE RANGE                               */}
        {/* ================================================================ */}

        <Popover>
          <PopoverTrigger
            render={
              <Button variant="outline" className="h-10 gap-2 px-3 font-normal">
                <CalendarDays className="size-4 shrink-0" />

                {/* Desktop */}
                <span className="hidden md:inline">
                  {formatDateRange(date)}
                </span>

                {/* Mobile */}
                <span className="md:hidden">
                  {date?.from?.toLocaleDateString("en-IN", {
                    month: "short",
                    year: "numeric",
                  }) ?? "Date"}
                </span>

                <ChevronDown className="size-4 text-muted-foreground" />
              </Button>
            }
          />

          {/* ============================================================ */}
          {/*                       DATE POPOVER                            */}
          {/* ============================================================ */}

          <PopoverContent align="end" className="w-auto overflow-hidden p-0">
            <div className="flex flex-col">
              {/* ======================================================== */}
              {/*                  CALENDAR + PRESETS                      */}
              {/* ======================================================== */}

              <div className="flex flex-col sm:flex-row">
                <div className="flex flex-col">
                  {/* ======================================================== */}
                  {/*                       DATE INPUTS                         */}
                  {/* ======================================================== */}

                  <div className="space-y-1 border-b p-3">
                    <div className="text-xs font-medium text-muted-foreground">
                      Enter Date Range : {/* Format Hint */}
                      <span className="text-[0.7rem]">
                        (Format: DD/MM/YYYY)
                      </span>
                    </div>

                    <div className="flex items-end gap-2">
                      {/* From */}
                      <div className="space-y-1">
                        <label
                          htmlFor="from-date"
                          className="mr-3 text-xs font-medium"
                        >
                          From
                        </label>

                        <Input
                          id="from-date"
                          type="text"
                          inputMode="numeric"
                          value={fromInput}
                          onChange={handleFromDateChange}
                          placeholder="DD/MM/YYYY"
                          maxLength={10}
                          className="h-8 w-32 rounded-sm"
                        />
                      </div>

                      {/* Arrow */}
                      <div className="pb-2 text-muted-foreground">→</div>

                      {/* To */}
                      <div className="space-y-1">
                        <label
                          htmlFor="to-date"
                          className="mr-3 text-xs font-medium"
                        >
                          To
                        </label>

                        <Input
                          id="to-date"
                          type="text"
                          inputMode="numeric"
                          value={toInput}
                          onChange={handleToDateChange}
                          placeholder="DD/MM/YYYY"
                          maxLength={10}
                          className="h-8 w-32 rounded-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Calendar */}
                  <div className="p-3">
                    <Calendar
                      mode="range"
                      selected={date}
                      onSelect={handleCalendarChange}
                      numberOfMonths={2}
                      defaultMonth={date?.from}
                    />
                  </div>
                </div>

                {/* Presets */}
                <div className="w-44 border-l p-2">
                  <div className="mb-2 px-2 text-xs font-medium text-muted-foreground">
                    Date Range
                  </div>

                  <div className="space-y-1">
                    {datePresets.map((preset) => (
                      <Button
                        key={preset.value}
                        variant={
                          selectedPreset === preset.value
                            ? "secondary"
                            : "ghost"
                        }
                        className="w-full justify-start text-sm"
                        onClick={() => handlePresetChange(preset.value)}
                      >
                        {preset.label}
                      </Button>
                    ))}
                  </div>

                  {/* Custom */}
                  <div className="mt-1 border-t pt-1">
                    <Button
                      variant={
                        selectedPreset === "custom" ? "secondary" : "ghost"
                      }
                      className="w-full justify-start text-sm"
                      onClick={() => handlePresetChange("custom")}
                    >
                      Custom Range
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* ================================================================ */}
        {/*                         NOTIFICATIONS                            */}
        {/* ================================================================ */}

        <Button
          variant="outline"
          size="icon"
          className="relative size-10 shrink-0"
          aria-label="Notifications"
        >
          <Bell className="size-4" />

          <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
            3
          </span>
        </Button>

        {/* ================================================================ */}
        {/*                       ADD TRANSACTION                            */}
        {/* ================================================================ */}

        <Button className="h-10 shrink-0 gap-2 px-3 sm:px-4">
          <Plus className="size-4" />

          <span className="hidden sm:inline">Add Transaction</span>
        </Button>

        {/* ================================================================ */}
        {/*                            PROFILE                               */}
        {/* ================================================================ */}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                className="h-10 gap-2 px-1.5 hover:bg-muted"
              >
                <Avatar className="size-9">
                  <AvatarImage src="/avatar.png" alt="Profile" />
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
              </Button>
            }
          />
          <DropdownMenuContent className="w-40" align="start">
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem>
                <Link href="/settings" className="flex items-center gap-3">
                  <User className="size-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/settings" className="flex items-center gap-3">
                  <Settings className="size-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="gap-3 text-destructive">
                <Link href="/" className="flex items-center gap-3">
                  <LogOut className="size-4" />
                  Log out
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
