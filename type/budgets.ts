import { StatCardData } from "./types"

export type BudgetStatus = "on-track" | "over-budget" | "under-budget"

export type BudgetColor =
  "purple" | "orange" | "green" | "blue" | "pink" | "yellow" | "teal"

export type Budget = {
  id: number
  category: string
  transactions: number
  budget: number
  spent: number
  icon: React.ElementType
  color: BudgetColor
}

export const colorStyles: Record<
  BudgetColor,
  {
    icon: string
    iconColor: string
    progress: string
  }
> = {
  purple: {
    icon: "bg-purple-100",
    iconColor: "text-purple-600",
    progress: "bg-purple-500",
  },
  orange: {
    icon: "bg-orange-100",
    iconColor: "text-orange-500",
    progress: "bg-orange-500",
  },
  green: {
    icon: "bg-emerald-100",
    iconColor: "text-emerald-600",
    progress: "bg-emerald-500",
  },
  blue: {
    icon: "bg-blue-100",
    iconColor: "text-blue-600",
    progress: "bg-blue-500",
  },
  pink: {
    icon: "bg-pink-100",
    iconColor: "text-pink-500",
    progress: "bg-pink-500",
  },
  yellow: {
    icon: "bg-yellow-100",
    iconColor: "text-yellow-600",
    progress: "bg-yellow-500",
  },
  teal: {
    icon: "bg-teal-100",
    iconColor: "text-teal-600",
    progress: "bg-teal-500",
  },
}

export type BudgetData = {
  stats: StatCardData[]
  budgetList: Budget[]
}
