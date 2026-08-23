import { StatCardData } from "./types"

export type CategoryType = "income" | "expense"

export type Category = {
  id: number
  name: string
  description: string
  type: CategoryType
  transactions: number
  totalAmount: number
  percentage: number
  color: string
  icon: React.ElementType
}

export type CategoriesData = {
  stats: StatCardData[]
  categoriesList: Category[]
}
