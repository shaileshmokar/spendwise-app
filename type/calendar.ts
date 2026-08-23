export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export type Transaction = {
  id: number
  date: string
  title: string
  category: string
  amount: number
  type: "income" | "expense"
}
