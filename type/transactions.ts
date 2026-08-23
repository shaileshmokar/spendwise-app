import { StatCardData } from "./types"

export type TransactionType = "income" | "expense"
export type TransactionStatus = "completed" | "pending" | "failed"

export type TransactionIcon =
  | "shopping-cart"
  | "briefcase"
  | "credit-card"
  | "car"
  | "zap"
  | "utensils"
  | "house"

export type Transaction = {
  id: string
  date: string
  time: string
  description: string
  subDescription: string
  category: string
  categoryColor: string
  account: string
  accountNumber: string
  type: TransactionType
  amount: number
  status: TransactionStatus
  icon: TransactionIcon
  iconClass: string
  iconBgClass: string
}

export type TransactionData = {
  stats: StatCardData[]
  transactionsList: Transaction[]
}
