import { type LucideIcon } from "lucide-react"
import { StatCardData } from "./types"

export type CashFlowData = {
  month: string
  income: number
  expenses: number
}

export type SpendingByCategory = {
  category: string
  amount: number
  fill: string
}

export type RecentTransaction = {
  name: string
  category: string
  date: string
  amount: number
  type: "income" | "expense"
  icon: LucideIcon
  iconClass: string
  bgClass: string
}

export type BudgetOverview = {
  category: string
  spent: number
  budget: number
  percentage: number
  icon: LucideIcon
  iconClass: string
  bgClass: string
  progressClass: string
}

export type FinancialGoal = {
  title: string
  current: number
  target: number
  message: string
}

export type FinancialTip = {
  title: string
}

export type MonthlyFilter = {
  label: string
  value: string
}

export type SpendingTrend = {
  date: string
  spending: number
}

export type UpcomingBill = {
  name: string
  date: string
  amount: number
  dueIn: string
  icon: LucideIcon
  iconClass: string
  bgClass: string
}

export type DashboardData = {
  stats: StatCardData[]
  cashFlow: CashFlowData[]
  spendingByCategory: SpendingByCategory[]
  spendingTrend: SpendingTrend[]
  upcomingBills: UpcomingBill[]
  recentTransaction: RecentTransaction[]
  budgetOverview: BudgetOverview[]
  financialGoal: FinancialGoal
  financialTip: FinancialTip
}
