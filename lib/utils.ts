import { AccountType, Activity } from "@/type/accounts"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getGreeting = () => {
  const hour = new Date().getHours()

  if (hour < 12) return "Good morning"
  if (hour < 17) return "Good afternoon"
  return "Good evening"
}

export const formatCurrency = (value: number) => {
  return `₹${value.toLocaleString("en-IN")}`
}

export const formatCurrencyWithDigits = (value: number) => {
  return `₹${value.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

// const formatCurrency = (value: number) => {
//   const absoluteValue = Math.abs(value)

//   return `₹${absoluteValue.toLocaleString("en-IN", {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   })}`
// }

export const getAccountTypeClass = (type: AccountType) => {
  switch (type) {
    case "Bank Account":
      return "bg-purple-100 text-purple-600"

    case "Credit Card":
      return "bg-blue-100 text-blue-600"

    case "E-Wallet":
      return "bg-orange-100 text-orange-600"
  }
}

export const getActivityIconClass = (type: Activity["type"]) => {
  return type === "income"
    ? "bg-emerald-100 text-emerald-600"
    : "bg-purple-100 text-purple-600"
}
