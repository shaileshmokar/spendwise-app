import { Account, AccountsData, Activity } from "@/type/accounts"
import { StatCardData } from "@/type/types"
import { CreditCard, Landmark, Wallet, WalletMinimal } from "lucide-react"

export const accounts = ["HDFC Bank", "ICICI Bank", "SBI Card"]

export const accountsStats: StatCardData[] = [
  {
    title: "Total Balance",
    value: "₹6,84,500",
    change: "+8.5%",
    positive: true,
    icon: Wallet,
    filled: false,
    iconClass: "text-indigo-600",
    bgClass: "bg-indigo-100",
  },
  {
    title: "Bank Accounts",
    value: "₹4,35,250",
    change: "+6.5%",
    positive: true,
    icon: Landmark,
    filled: true,
    iconClass: "text-green-600",
    bgClass: "bg-green-100",
  },
  {
    title: "Credit Cards",
    value: "₹52,400",
    change: "-12.4%",
    positive: false,
    icon: CreditCard,
    filled: false,
    iconClass: "text-blue-600",
    bgClass: "bg-blue-100",
  },

  {
    title: "E-Wallets & Cash",
    value: "₹23,850",
    change: "3.2%",
    positive: true,
    icon: WalletMinimal,
    filled: false,
    iconClass: "text-yellow-600",
    bgClass: "bg-yellow-100",
  },
]

export const accountsList: Account[] = [
  {
    id: 1,
    name: "SBI Savings Account",
    type: "Bank Account",
    lastFour: "4567",
    balance: 245680,
    change: 7.2,
    logo: "SBI",
    logoClassName: "bg-blue-600 text-white",
  },
  {
    id: 2,
    name: "HDFC Current Account",
    type: "Bank Account",
    lastFour: "7890",
    balance: 135420,
    change: 5.4,
    logo: "H",
    logoClassName: "bg-white text-red-500",
  },
  {
    id: 3,
    name: "ICICI Savings Account",
    type: "Bank Account",
    lastFour: "2345",
    balance: 54150,
    change: 3.1,
    logo: "ICICI",
    logoClassName: "bg-white text-orange-600",
  },
  {
    id: 4,
    name: "HDFC Credit Card",
    type: "Credit Card",
    lastFour: "1111",
    balance: -78450,
    change: 11.8,
    logo: "VISA",
    logoClassName: "bg-white text-blue-700",
  },
  {
    id: 5,
    name: "SBI Credit Card",
    type: "Credit Card",
    lastFour: "2222",
    balance: -47000,
    change: 13.2,
    logo: "MC",
    logoClassName: "bg-white text-red-500",
  },
  {
    id: 6,
    name: "Paytm Wallet",
    type: "E-Wallet",
    lastFour: "3456",
    balance: 18250,
    change: 4.6,
    logo: "paytm",
    logoClassName: "bg-white text-blue-600",
  },
]

export const accountActivities: Activity[] = [
  {
    id: 1,
    account: "SBI Savings Account",
    description: "Received Salary",
    date: "Today, 9:30 AM",
    amount: 85000,
    type: "income",
  },
  {
    id: 2,
    account: "HDFC Credit Card",
    description: "Swiggy Payment",
    date: "Yesterday, 8:45 PM",
    amount: -650,
    type: "expense",
  },
  {
    id: 3,
    account: "ICICI Savings Account",
    description: "UPI Transfer Received",
    date: "Yesterday, 6:20 PM",
    amount: 2500,
    type: "income",
  },
  {
    id: 4,
    account: "SBI Credit Card",
    description: "Amazon Purchase",
    date: "14 May 2024",
    amount: -1299,
    type: "expense",
  },
  {
    id: 5,
    account: "Paytm Wallet",
    description: "Mobile Recharge",
    date: "14 May 2024",
    amount: -199,
    type: "expense",
  },
]

export const accountsData: AccountsData = {
  stats: accountsStats,
  accountsList: accountsList,
}
