"use client"

import * as React from "react"
import type { DateRange } from "react-day-picker"
import { CalendarDays, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  formatDateInput,
  formatDateRange,
  formatTypedDate,
  getDateRange,
  parseDateInput,
  type DatePreset,
} from "@/lib/date-range"

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

export function HeaderDateRange() {
  const initialRange = getDateRange("this-month")

  const [date, setDate] = React.useState<DateRange | undefined>(initialRange)

  const [selectedPreset, setSelectedPreset] =
    React.useState<DatePreset>("this-month")

  const [fromInput, setFromInput] = React.useState(
    formatDateInput(initialRange.from)
  )

  const [toInput, setToInput] = React.useState(formatDateInput(initialRange.to))

  /* ---------------------------------------------------------------------- */
  /*                         Sync Date Inputs                               */
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
  /*                         Calendar Handler                               */
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
  /*                         From Date Handler                              */
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
  /*                           To Date Handler                              */
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
    <Popover>
      {/* ================================================================== */}
      {/*                         DATE RANGE BUTTON                          */}
      {/* ================================================================== */}

      <PopoverTrigger
        render={
          <Button variant="outline" className="h-10 gap-2 px-3 font-normal">
            <CalendarDays className="size-4 shrink-0" />

            {/* Desktop */}
            <span className="hidden md:inline">{formatDateRange(date)}</span>

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

      {/* ================================================================== */}
      {/*                         DATE POPOVER                                */}
      {/* ================================================================== */}

      <PopoverContent align="end" className="w-auto overflow-hidden p-0">
        <div className="flex flex-col">
          {/* ================================================================= */}
          {/*                    CALENDAR + PRESETS                            */}
          {/* ================================================================= */}

          <div className="flex flex-col sm:flex-row">
            <div className="flex flex-col">
              {/* ============================================================= */}
              {/*                         DATE INPUTS                           */}
              {/* ============================================================= */}

              <div className="space-y-1 border-b p-3">
                <div className="text-xs font-medium text-muted-foreground">
                  Enter Date Range :{" "}
                  <span className="text-[0.7rem]">(Format: DD/MM/YYYY)</span>
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

              {/* ============================================================= */}
              {/*                           CALENDAR                             */}
              {/* ============================================================= */}

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

            {/* ================================================================= */}
            {/*                           PRESETS                                 */}
            {/* ================================================================= */}

            <div className="w-44 border-l p-2">
              <div className="mb-2 px-2 text-xs font-medium text-muted-foreground">
                Date Range
              </div>

              <div className="space-y-1">
                {datePresets.map((preset) => (
                  <Button
                    key={preset.value}
                    variant={
                      selectedPreset === preset.value ? "secondary" : "ghost"
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
                  variant={selectedPreset === "custom" ? "secondary" : "ghost"}
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
  )
}
