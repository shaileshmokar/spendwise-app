import {
  BudgetOverview,
  CashFlowData,
  DashboardData,
  FinancialGoal,
  FinancialTip,
  MonthlyFilter,
  RecentTransaction,
  SpendingByCategory,
  SpendingTrend,
  UpcomingBill,
} from "@/type/dashboard"
import { StatCardData } from "@/type/types"
import {
  ArrowBigDown,
  ArrowBigUp,
  BriefcaseBusiness,
  Car,
  CreditCard,
  Film,
  House,
  Lightbulb,
  PiggyBank,
  ShoppingBag,
  ShoppingCart,
  Utensils,
  Wallet,
  Wifi,
  Zap,
} from "lucide-react"

export const dashboardStats: StatCardData[] = [
  {
    title: "Total Balance",
    value: "68,450.00",
    change: "+8.5%",
    positive: true,
    icon: Wallet,
    filled: false,
    iconClass: "text-indigo-600",
    bgClass: "bg-indigo-100",
  },
  {
    title: "Total Income",
    value: "₹1,20,850",
    change: "+12.5%",
    positive: true,
    icon: ArrowBigUp,
    filled: false,
    iconClass: "text-green-600",
    bgClass: "bg-green-100",
  },
  {
    title: "Total Expenses",
    value: "₹52,400",
    change: "-5.4%",
    positive: false,
    icon: ArrowBigDown,
    filled: false,
    iconClass: "text-red-600",
    bgClass: "bg-red-100",
  },

  {
    title: "Net Savings",
    value: "₹68,450",
    change: "+18.6%",
    positive: true,
    icon: PiggyBank,
    filled: false,
    iconClass: "text-yellow-600",
    bgClass: "bg-yellow-100",
  },
]

export const dashboardBarChartData: CashFlowData[] = [
  { month: "May 1", income: 12000, expenses: 8000 },
  { month: "May 6", income: 18000, expenses: 11000 },
  { month: "May 11", income: 15000, expenses: 9000 },
  { month: "May 16", income: 22000, expenses: 14000 },
  { month: "May 21", income: 17000, expenses: 12000 },
  { month: "May 26", income: 25000, expenses: 16000 },
  { month: "May 31", income: 20000, expenses: 13000 },
]

export const dashboardPieChartData: SpendingByCategory[] = [
  {
    category: "food",
    amount: 12500,
    fill: "var(--color-food)",
  },
  {
    category: "shopping",
    amount: 8200,
    fill: "var(--color-shopping)",
  },
  {
    category: "bills",
    amount: 6800,
    fill: "var(--color-bills)",
  },
  {
    category: "transport",
    amount: 4500,
    fill: "var(--color-transport)",
  },
  {
    category: "entertainment",
    amount: 3200,
    fill: "var(--color-entertainment)",
  },
  {
    category: "others",
    amount: 2800,
    fill: "var(--color-others)",
  },
]

export const recentTransactionsData: RecentTransaction[] = [
  {
    name: "Grocery Shopping",
    category: "Food & Dining",
    date: "May 16, 2024",
    amount: 1250,
    type: "expense",
    icon: ShoppingCart,
    iconClass: "text-white",
    bgClass: "bg-emerald-500",
  },
  {
    name: "Netflix Subscription",
    category: "Entertainment",
    date: "May 15, 2024",
    amount: 649,
    type: "expense",
    icon: CreditCard,
    iconClass: "text-white",
    bgClass: "bg-red-500",
  },
  {
    name: "Fuel",
    category: "Transport",
    date: "May 15, 2024",
    amount: 1800,
    type: "expense",
    icon: Car,
    iconClass: "text-white",
    bgClass: "bg-blue-500",
  },
  {
    name: "Salary",
    category: "Income",
    date: "May 15, 2024",
    amount: 85000,
    type: "income",
    icon: BriefcaseBusiness,
    iconClass: "text-white",
    bgClass: "bg-emerald-500",
  },
  {
    name: "Rent",
    category: "Housing",
    date: "May 14, 2024",
    amount: 12000,
    type: "expense",
    icon: House,
    iconClass: "text-white",
    bgClass: "bg-violet-500",
  },
]

export const dashboardMonthFilters: MonthlyFilter[] = [
  { label: "This Month", value: "this-month" },
  { label: "Last Month", value: "last-month" },
]

export const spendingTrendChartData: SpendingTrend[] = [
  { date: "May 1", spending: 2500 },
  { date: "May 6", spending: 6500 },
  { date: "May 11", spending: 8500 },
  { date: "May 16", spending: 10500 },
  { date: "May 21", spending: 14000 },
  { date: "May 26", spending: 11000 },
  { date: "May 31", spending: 12500 },
]

export const budgetOverviewData: BudgetOverview[] = [
  {
    category: "Housing",
    spent: 14560,
    budget: 20000,
    percentage: 73,
    icon: House,
    iconClass: "text-indigo-600",
    bgClass: "bg-indigo-50",
    progressClass: "bg-indigo-500",
  },
  {
    category: "Food & Dining",
    spent: 10480,
    budget: 15000,
    percentage: 70,
    icon: Utensils,
    iconClass: "text-emerald-600",
    bgClass: "bg-emerald-50",
    progressClass: "bg-emerald-500",
  },
  {
    category: "Transport",
    spent: 7850,
    budget: 10000,
    percentage: 78,
    icon: Car,
    iconClass: "text-blue-600",
    bgClass: "bg-blue-50",
    progressClass: "bg-blue-500",
  },
  {
    category: "Shopping",
    spent: 6120,
    budget: 8000,
    percentage: 77,
    icon: ShoppingBag,
    iconClass: "text-orange-500",
    bgClass: "bg-orange-50",
    progressClass: "bg-orange-400",
  },
  {
    category: "Utilities",
    spent: 4190,
    budget: 6000,
    percentage: 70,
    icon: Zap,
    iconClass: "text-pink-500",
    bgClass: "bg-pink-50",
    progressClass: "bg-pink-400",
  },
  {
    category: "Entertainment",
    spent: 4609,
    budget: 8000,
    percentage: 58,
    icon: Film,
    iconClass: "text-indigo-500",
    bgClass: "bg-indigo-50",
    progressClass: "bg-indigo-400",
  },
]

export const dashboardBillsData: UpcomingBill[] = [
  {
    name: "Internet Bill",
    date: "May 20, 2024",
    amount: 799,
    dueIn: "Due in 2 days",
    icon: Wifi,
    iconClass: "text-blue-600",
    bgClass: "bg-blue-50",
  },
  {
    name: "Credit Card Bill",
    date: "May 25, 2024",
    amount: 5450,
    dueIn: "Due in 7 days",
    icon: CreditCard,
    iconClass: "text-orange-500",
    bgClass: "bg-orange-50",
  },
  {
    name: "Electricity Bill",
    date: "May 28, 2024",
    amount: 2450,
    dueIn: "Due in 10 days",
    icon: Lightbulb,
    iconClass: "text-yellow-500",
    bgClass: "bg-yellow-50",
  },
  {
    name: "Rent",
    date: "Jun 1, 2024",
    amount: 12000,
    dueIn: "Due in 14 days",
    icon: House,
    iconClass: "text-red-500",
    bgClass: "bg-red-50",
  },
]

export const financialGoal: FinancialGoal = {
  title: "Save ₹1,00,000 this month",
  current: 68450,
  target: 100000,
  message: "You are doing great. Keep it up.",
}

export const financialTip: FinancialTip = {
  title: " You spent 20% less on dining out compared to last month. Great job!",
}

export const dashboardData: DashboardData = {
  stats: dashboardStats,
  cashFlow: dashboardBarChartData,
  spendingByCategory: dashboardPieChartData,
  spendingTrend: spendingTrendChartData,
  upcomingBills: dashboardBillsData,
  recentTransaction: recentTransactionsData,
  budgetOverview: budgetOverviewData,
  financialGoal: financialGoal,
  financialTip: financialTip,
}
