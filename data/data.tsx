import {
  GalleryVerticalEndIcon,
  BookOpenIcon,
  Settings,
  Calendar,
  ChartBar,
  Home,
  ArrowLeftRight,
  Target,
  Wallet,
  LayoutDashboard,
  BriefcaseBusiness,
  ShieldCheck,
  ArrowBigUp,
  ArrowBigDown,
  PiggyBank,
  Wallpaper,
} from "lucide-react"

export const data = {
  user: {
    name: "Shailesh Mokar",
    email: "shailesh@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: {
    name: "Acme Inc",
    logo: <GalleryVerticalEndIcon />,
    plan: "Enterprise",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <Home />,
    },
    {
      title: "Transactions",
      url: "/dashboard/transactions",
      icon: <ArrowLeftRight />,
    },
    {
      title: "Categories",
      url: "/dashboard/categories",
      icon: <LayoutDashboard />,
    },
    {
      title: "Budgets",
      url: "/dashboard/budgets",
      icon: <Wallet />,
    },
    {
      title: "Goals",
      url: "/dashboard/goals",
      icon: <Target />,
      isActive: true,
    },
    {
      title: "Accounts",
      url: "/dashboard/accounts",
      icon: <BriefcaseBusiness />,
    },
    // {
    //   title: "Bills",
    //   url: "/dashboard/bills",
    //   icon: <BookOpenIcon />,
    // },
    {
      title: "Reports",
      url: "/dashboard/reports",
      icon: <ChartBar />,
    },
    {
      title: "Calendar",
      url: "/dashboard/calendar",
      icon: <Calendar />,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: <Settings />,
    },
  ],
}

// export const transactionStats = [
//   {
//     title: "Total Transactions",
//     value: "128",
//     change: "+12.5%",
//     positive: true,
//     icon: Wallpaper,
//     filled: false,
//     iconClass: "text-blue-600",
//     bgClass: "bg-blue-100",
//   },
//   {
//     title: "Total Income",
//     value: "₹1,20,850",
//     change: "+12.5%",
//     positive: true,
//     icon: ArrowBigUp,
//     filled: true,
//     iconClass: "text-green-600",
//     bgClass: "bg-green-100",
//   },
//   {
//     title: "Total Expenses",
//     value: "₹52,400",
//     change: "-5.4%",
//     positive: false,
//     icon: ArrowBigDown,
//     filled: true,
//     iconClass: "text-red-600",
//     bgClass: "bg-red-100",
//   },

//   {
//     title: "Average Transaction",
//     value: "₹567",
//     change: "-3.2%",
//     positive: false,
//     icon: PiggyBank,
//     filled: false,
//     iconClass: "text-yellow-600",
//     bgClass: "bg-yellow-100",
//   },
// ]

// src/mock-data/dashboard.ts

export type DashboardStats = {
  totalBalance: number
  totalIncome: number
  totalExpense: number
  netSavings: number

  balanceChange: number
  incomeChange: number
  expenseChange: number
  savingsChange: number
}

export type ExpenseCategory = {
  id: string
  name: string
  amount: number
  percentage: number
  color: string
  icon: string
}

export type ExpenseTrend = {
  date: string
  amount: number
}

export type RecentTransaction = {
  id: string
  title: string
  category: string
  type: "income" | "expense"
  amount: number
  date: string
  icon: string
}

export type Budget = {
  id: string
  category: string
  spent: number
  limit: number
  percentage: number
  color: string
  icon: string
}

export type PaymentMethod = {
  id: string
  name: string
  amount: number
  percentage: number
  color: string
}

export type SavingsGoal = {
  name: string
  current: number
  target: number
  percentage: number
}

export type UpcomingBill = {
  id: string
  name: string
  amount: number
  dueDate: string
  category: string
  icon: string
  status: "upcoming" | "due-soon" | "overdue"
}

export type SpendingInsight = {
  id: string
  title: string
  description: string
  type: "positive" | "warning" | "info"
  icon: string
}

// --------------------------------------------------
// Dashboard Stats
// --------------------------------------------------

// export const dashboardStats: DashboardStats = {
//   totalBalance: 68450,
//   totalIncome: 120850,
//   totalExpense: 52400,
//   netSavings: 68450,

//   balanceChange: 8.5,
//   incomeChange: 12.3,
//   expenseChange: -5.4,
//   savingsChange: 18.6,
// }

// --------------------------------------------------
// Expense Categories
// --------------------------------------------------

export const expenseCategories: ExpenseCategory[] = [
  {
    id: "housing",
    name: "Housing",
    amount: 14560,
    percentage: 28,
    color: "#7c3aed",
    icon: "Home",
  },
  {
    id: "food",
    name: "Food & Dining",
    amount: 10480,
    percentage: 20,
    color: "#3b82f6",
    icon: "Utensils",
  },
  {
    id: "transport",
    name: "Transport",
    amount: 7850,
    percentage: 15,
    color: "#22c55e",
    icon: "Car",
  },
  {
    id: "shopping",
    name: "Shopping",
    amount: 6120,
    percentage: 12,
    color: "#f59e0b",
    icon: "ShoppingBag",
  },
  {
    id: "entertainment",
    name: "Entertainment",
    amount: 5230,
    percentage: 10,
    color: "#f43f5e",
    icon: "Tv",
  },
  {
    id: "utilities",
    name: "Utilities",
    amount: 4190,
    percentage: 8,
    color: "#a855f7",
    icon: "Zap",
  },
  {
    id: "others",
    name: "Others",
    amount: 3970,
    percentage: 7,
    color: "#94a3b8",
    icon: "MoreHorizontal",
  },
]

// --------------------------------------------------
// Expense Trend
// --------------------------------------------------

export const expenseTrend: ExpenseTrend[] = [
  {
    date: "May 1",
    amount: 3100,
  },
  {
    date: "May 2",
    amount: 4500,
  },
  {
    date: "May 3",
    amount: 3700,
  },
  {
    date: "May 4",
    amount: 5200,
  },
  {
    date: "May 5",
    amount: 7600,
  },
  {
    date: "May 6",
    amount: 9800,
  },
  {
    date: "May 7",
    amount: 10500,
  },
  {
    date: "May 8",
    amount: 8200,
  },
  {
    date: "May 9",
    amount: 6100,
  },
  {
    date: "May 10",
    amount: 3700,
  },
  {
    date: "May 11",
    amount: 5400,
  },
  {
    date: "May 12",
    amount: 5200,
  },
  {
    date: "May 13",
    amount: 7900,
  },
  {
    date: "May 14",
    amount: 7600,
  },
  {
    date: "May 15",
    amount: 9200,
  },
  {
    date: "May 16",
    amount: 10500,
  },
]

// --------------------------------------------------
// Recent Transactions
// --------------------------------------------------

export const recentTransactions: RecentTransaction[] = [
  {
    id: "txn_001",
    title: "Grocery Shopping",
    category: "Food & Dining",
    type: "expense",
    amount: 1250,
    date: "May 16, 2024",
    icon: "ShoppingCart",
  },
  {
    id: "txn_002",
    title: "Netflix Subscription",
    category: "Entertainment",
    type: "expense",
    amount: 649,
    date: "May 15, 2024",
    icon: "Tv",
  },
  {
    id: "txn_003",
    title: "Fuel",
    category: "Transport",
    type: "expense",
    amount: 1800,
    date: "May 15, 2024",
    icon: "Fuel",
  },
  {
    id: "txn_004",
    title: "Salary",
    category: "Income",
    type: "income",
    amount: 85000,
    date: "May 15, 2024",
    icon: "Banknote",
  },
  {
    id: "txn_005",
    title: "Rent",
    category: "Housing",
    type: "expense",
    amount: 12000,
    date: "May 14, 2024",
    icon: "Home",
  },
  {
    id: "txn_006",
    title: "Electricity Bill",
    category: "Utilities",
    type: "expense",
    amount: 2350,
    date: "May 13, 2024",
    icon: "Zap",
  },
  {
    id: "txn_007",
    title: "Amazon Shopping",
    category: "Shopping",
    type: "expense",
    amount: 3499,
    date: "May 12, 2024",
    icon: "ShoppingBag",
  },
]

// --------------------------------------------------
// Budgets
// --------------------------------------------------

export const budgets: Budget[] = [
  {
    id: "budget_001",
    category: "Housing",
    spent: 14560,
    limit: 20000,
    percentage: 73,
    color: "#7c3aed",
    icon: "Home",
  },
  {
    id: "budget_002",
    category: "Food & Dining",
    spent: 10480,
    limit: 15000,
    percentage: 70,
    color: "#22c55e",
    icon: "Utensils",
  },
  {
    id: "budget_003",
    category: "Transport",
    spent: 7850,
    limit: 10000,
    percentage: 78,
    color: "#3b82f6",
    icon: "Car",
  },
  {
    id: "budget_004",
    category: "Shopping",
    spent: 6120,
    limit: 8000,
    percentage: 77,
    color: "#f59e0b",
    icon: "ShoppingBag",
  },
]

// --------------------------------------------------
// Payment Methods
// --------------------------------------------------

export const paymentMethods: PaymentMethod[] = [
  {
    id: "upi",
    name: "UPI",
    amount: 21600,
    percentage: 41,
    color: "#7c3aed",
  },
  {
    id: "debit-card",
    name: "Debit Card",
    amount: 15200,
    percentage: 29,
    color: "#3b82f6",
  },
  {
    id: "credit-card",
    name: "Credit Card",
    amount: 10800,
    percentage: 21,
    color: "#22c55e",
  },
  {
    id: "cash",
    name: "Cash",
    amount: 4800,
    percentage: 9,
    color: "#f59e0b",
  },
]

// --------------------------------------------------
// Savings Goal
// --------------------------------------------------

export const savingsGoal: SavingsGoal = {
  name: "Monthly Savings Goal",
  current: 68450,
  target: 100000,
  percentage: 68,
}

// --------------------------------------------------
// Upcoming Bills
// --------------------------------------------------

export const upcomingBills: UpcomingBill[] = [
  {
    id: "bill_001",
    name: "Netflix",
    amount: 649,
    dueDate: "May 18, 2024",
    category: "Entertainment",
    icon: "Tv",
    status: "due-soon",
  },
  {
    id: "bill_002",
    name: "Electricity",
    amount: 2350,
    dueDate: "May 20, 2024",
    category: "Utilities",
    icon: "Zap",
    status: "upcoming",
  },
  {
    id: "bill_003",
    name: "Internet",
    amount: 999,
    dueDate: "May 22, 2024",
    category: "Utilities",
    icon: "Wifi",
    status: "upcoming",
  },
  {
    id: "bill_004",
    name: "Rent",
    amount: 12000,
    dueDate: "June 1, 2024",
    category: "Housing",
    icon: "Home",
    status: "upcoming",
  },
]

// --------------------------------------------------
// Spending Insights
// --------------------------------------------------

export const spendingInsights: SpendingInsight[] = [
  {
    id: "insight_001",
    title: "Great job!",
    description: "Your expenses are 5.4% lower than last month.",
    type: "positive",
    icon: "TrendingDown",
  },
  {
    id: "insight_002",
    title: "Shopping is increasing",
    description: "You've spent 18% more on shopping compared with last month.",
    type: "warning",
    icon: "ShoppingBag",
  },
  {
    id: "insight_003",
    title: "You're on track",
    description: "You're 68% toward your monthly savings goal.",
    type: "info",
    icon: "Target",
  },
]

// --------------------------------------------------
// Dashboard Date Range
// --------------------------------------------------

export const dashboardDateRange = {
  from: "May 1, 2024",
  to: "May 31, 2024",
  label: "May 1 - May 31, 2024",
}

// --------------------------------------------------
// User
// --------------------------------------------------

export const dashboardUser = {
  id: "user_001",
  name: "Shailesh Mokar",
  email: "shailesh@example.com",
  avatar: "/avatars/user.jpg",
}
