import { ArrowBigDown, ArrowBigUp, PiggyBank, Wallpaper } from "lucide-react"

export const reportsStats = [
  {
    title: "Total Transactions",
    value: "128",
    change: "+12.5%",
    positive: true,
    icon: Wallpaper,
    filled: false,
    iconClass: "text-blue-600",
    bgClass: "bg-blue-100",
  },
  {
    title: "Total Income",
    value: "₹1,20,850",
    change: "+12.5%",
    positive: true,
    icon: ArrowBigUp,
    filled: true,
    iconClass: "text-green-600",
    bgClass: "bg-green-100",
  },
  {
    title: "Total Expenses",
    value: "₹52,400",
    change: "-5.4%",
    positive: false,
    icon: ArrowBigDown,
    filled: true,
    iconClass: "text-red-600",
    bgClass: "bg-red-100",
  },

  {
    title: "Average Transaction",
    value: "₹567",
    change: "-3.2%",
    positive: false,
    icon: PiggyBank,
    filled: false,
    iconClass: "text-yellow-600",
    bgClass: "bg-yellow-100",
  },
]
