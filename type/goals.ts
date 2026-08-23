import { StatCardData } from "./types"

export type GoalColor = "purple" | "green" | "orange" | "pink" | "blue"

export type Goal = {
  id: number
  title: string
  icon: React.ElementType
  saved: number
  target: number
  dueDate: string
  color: GoalColor
}

export const colorStyles: Record<
  GoalColor,
  {
    icon: string
    iconColor: string
    badge: string
    progress: string
  }
> = {
  purple: {
    icon: "bg-purple-100",
    iconColor: "text-purple-600",
    badge: "bg-purple-100 text-purple-600",
    progress: "bg-purple-500",
  },
  green: {
    icon: "bg-emerald-100",
    iconColor: "text-emerald-600",
    badge: "bg-emerald-100 text-emerald-600",
    progress: "bg-emerald-500",
  },
  orange: {
    icon: "bg-orange-100",
    iconColor: "text-orange-500",
    badge: "bg-orange-100 text-orange-600",
    progress: "bg-orange-500",
  },
  pink: {
    icon: "bg-pink-100",
    iconColor: "text-pink-500",
    badge: "bg-pink-100 text-pink-600",
    progress: "bg-pink-500",
  },
  blue: {
    icon: "bg-blue-100",
    iconColor: "text-blue-600",
    badge: "bg-blue-100 text-blue-600",
    progress: "bg-blue-500",
  },
}

export type Contribution = {
  id: number
  title: string
  date: string
  amount: number
  icon: React.ElementType
  iconClass: string
  bgClass: string
}

export type GoalsData = {
  stats: StatCardData[]
  goalsList: Goal[]
  recentContribution: Contribution[]
}
