// lib/date/date-range.ts

import type { DateRange } from "react-day-picker"

export type DatePreset =
  | "today"
  | "yesterday"
  | "this-week"
  | "last-week"
  | "this-month"
  | "last-month"
  | "last-3-months"
  | "last-6-months"
  | "last-year"
  | "custom"

export function startOfDay(date: Date) {
  const result = new Date(date)
  result.setHours(0, 0, 0, 0)
  return result
}

export function endOfDay(date: Date) {
  const result = new Date(date)
  result.setHours(23, 59, 59, 999)
  return result
}

export const startOfWeek = (date: Date) => {
  const result = startOfDay(date)

  // Monday = first day of week
  const day = result.getDay()
  const diff = day === 0 ? -6 : 1 - day

  result.setDate(result.getDate() + diff)

  return result
}

export const endOfWeek = (date: Date) => {
  const result = startOfWeek(date)

  result.setDate(result.getDate() + 6)

  return endOfDay(result)
}

export const startOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

export const endOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999)
}

export function getDateRange(preset: DatePreset): DateRange {
  const today = new Date()

  switch (preset) {
    case "today":
      return {
        from: startOfDay(today),
        to: endOfDay(today),
      }

    case "yesterday": {
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)

      return {
        from: startOfDay(yesterday),
        to: endOfDay(yesterday),
      }
    }

    case "this-week":
      return {
        from: startOfWeek(today),
        to: endOfWeek(today),
      }

    case "last-week": {
      const lastWeek = new Date(today)
      lastWeek.setDate(lastWeek.getDate() - 7)

      return {
        from: startOfWeek(lastWeek),
        to: endOfWeek(lastWeek),
      }
    }

    case "this-month":
      return {
        from: startOfMonth(today),
        to: endOfMonth(today),
      }

    case "last-month": {
      const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1)

      return {
        from: startOfMonth(lastMonth),
        to: endOfMonth(lastMonth),
      }
    }

    case "last-3-months": {
      const from = new Date(today.getFullYear(), today.getMonth() - 2, 1)

      return {
        from: startOfMonth(from),
        to: endOfMonth(today),
      }
    }

    case "last-6-months": {
      const from = new Date(today.getFullYear(), today.getMonth() - 5, 1)

      return {
        from: startOfMonth(from),
        to: endOfMonth(today),
      }
    }

    case "last-year": {
      const from = new Date(
        today.getFullYear() - 1,
        today.getMonth(),
        today.getDate()
      )

      return {
        from: startOfDay(from),
        to: endOfDay(today),
      }
    }

    default:
      return {
        from: startOfDay(today),
        to: endOfDay(today),
      }
  }
}

/* -------------------------------------------------------------------------- */
/*                         Input Formatting                                   */
/* -------------------------------------------------------------------------- */

/**
 * Converts Date -> DD/MM/YYYY
 */
export function formatDateInput(date?: Date) {
  if (!date) return ""

  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}

/**
 * Converts typed numbers into DD/MM/YYYY
 *
 * Example:
 *
 * 16052024
 *
 * becomes:
 *
 * 16/05/2024
 */
export const formatTypedDate = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 8)

  if (digits.length <= 2) {
    return digits
  }

  if (digits.length <= 4) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`
  }

  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`
}

/**
 * Converts DD/MM/YYYY -> Date
 */
export const parseDateInput = (value: string) => {
  const digits = value.replace(/\D/g, "")

  if (digits.length !== 8) {
    return undefined
  }

  const day = Number(digits.slice(0, 2))
  const month = Number(digits.slice(2, 4))
  const year = Number(digits.slice(4, 8))

  const date = new Date(year, month - 1, day)

  // Invalid dates such as 31/02/2024
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return undefined
  }

  date.setHours(0, 0, 0, 0)

  return date
}

/**
 * Formats date for header button.
 *
 * Example:
 *
 * May 1 2025 - May 31, 2026
 */
export const formatDateRange = (date?: DateRange) => {
  if (!date?.from) {
    return "Select date"
  }

  if (!date.to) {
    return date.from.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  const fromYear = date.from.getFullYear()
  const toYear = date.to.getFullYear()

  // Different years
  if (fromYear !== toYear) {
    const from = date.from.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })

    const to = date.to.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })

    return `${from} - ${to}`
  }

  // Same year
  const from = date.from.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  })

  const to = date.to.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })

  return `${from} - ${to}`
}
