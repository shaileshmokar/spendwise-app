import { type LucideIcon } from "lucide-react"
import { StatCardData } from "./types"

export type AccountType = "Bank Account" | "Credit Card" | "E-Wallet"

export type Account = {
  id: number
  name: string
  type: AccountType
  lastFour: string
  balance: number
  change: number
  logo: string
  logoClassName: string
}

export type Activity = {
  id: number
  account: string
  description: string
  date: string
  amount: number
  type: "income" | "expense"
}

export type AccountsData = {
  stats: StatCardData[]
  accountsList: Account[]
}
