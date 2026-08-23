"use client"

import * as React from "react"
import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  ChevronRight,
  CreditCard,
  MoreVertical,
  Plus,
  Search,
  Shield,
  Smartphone,
  Wallet,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "../ui/separator"

import { accountsList, accountActivities } from "@/data/accounts"
import { AccountType } from "@/type/accounts"
import {
  formatCurrencyWithDigits,
  getAccountTypeClass,
  getActivityIconClass,
} from "@/lib/utils"

/* -------------------------------------------------------------------------- */
/* Mock Data                                                                  */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/* Accounts Page                                                              */
/* -------------------------------------------------------------------------- */

export default function AccountsPage() {
  const [search, setSearch] = React.useState("")
  const [filter, setFilter] = React.useState<AccountType | "all">("all")

  const filteredAccounts = accountsList.filter((account) => {
    const matchesSearch = account.name
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesFilter = filter === "all" || account.type === filter

    return matchesSearch && matchesFilter
  })

  const totalBalance = accountsList.reduce(
    (total, account) => total + account.balance,
    0
  )

  const bankBalance = accountsList
    .filter((account) => account.type === "Bank Account")
    .reduce((total, account) => total + account.balance, 0)

  const creditCardBalance = accountsList
    .filter((account) => account.type === "Credit Card")
    .reduce((total, account) => total + Math.abs(account.balance), 0)

  const walletBalance = accountsList
    .filter((account) => account.type === "E-Wallet")
    .reduce((total, account) => total + account.balance, 0)

  return (
    <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_400px]">
      {/* ================================================================== */}
      {/* Left Column                                                        */}
      {/* ================================================================== */}

      <div className="min-w-0 space-y-4">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold tracking-tight">All Accounts</h2>

          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative w-full sm:w-40 md:w-50">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search accounts..."
                className="h-9 pl-9"
              />
            </div>

            {/* Filter */}
            <Select
              value={filter}
              onValueChange={(value) => setFilter(value as AccountType | "all")}
            >
              <SelectTrigger className="h-9 w-24">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Bank Account">Bank</SelectItem>
                <SelectItem value="Credit Card">Cards</SelectItem>
                <SelectItem value="E-Wallet">E-Wallet</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Accounts Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-163 text-sm">
              <thead>
                <tr className="border-b bg-muted/20">
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                    Account
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                    Type
                  </th>

                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">
                    Balance
                  </th>

                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">
                    Change (30d)
                  </th>

                  <th className="w-16 px-4 py-3 text-right text-xs font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredAccounts.map((account) => (
                  <tr
                    key={account.id}
                    className="border-b last:border-0 hover:bg-muted/20"
                  >
                    {/* Account */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex size-10 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${account.logoClassName}`}
                        >
                          {account.logo}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate font-medium">{account.name}</p>

                          <p className="mt-0.5 text-xs text-muted-foreground">
                            •••• {account.lastFour}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Type */}
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-md px-2.5 py-1 text-[11px] font-medium ${getAccountTypeClass(
                          account.type
                        )}`}
                      >
                        {account.type}
                      </span>
                    </td>

                    {/* Balance */}
                    <td className="px-4 py-4 text-right">
                      <div
                        className={`font-semibold ${
                          account.balance < 0
                            ? "text-foreground"
                            : "text-foreground"
                        }`}
                      >
                        {account.balance < 0 && "-"}
                        {formatCurrencyWithDigits(account.balance)}
                      </div>

                      {account.balance < 0 && (
                        <div className="mt-0.5 text-xs text-muted-foreground">
                          Outstanding
                        </div>
                      )}
                    </td>

                    {/* Change */}
                    <td className="px-4 py-4 text-right">
                      <span
                        className={`font-medium ${
                          account.balance < 0
                            ? "text-red-500"
                            : "text-emerald-600"
                        }`}
                      >
                        {account.balance < 0 ? "↑" : "↑"} {account.change}%
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={
                            <Button
                              variant="outline"
                              size="icon"
                              className="size-8"
                            >
                              <MoreVertical className="size-4" />
                            </Button>
                          }
                        />

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Account</DropdownMenuItem>

                          <DropdownMenuItem>Edit Account</DropdownMenuItem>

                          <DropdownMenuItem>View Transactions</DropdownMenuItem>

                          <DropdownMenuSeparator />

                          <DropdownMenuItem className="text-destructive">
                            Delete Account
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}

                {filteredAccounts.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-12 text-center text-sm text-muted-foreground"
                    >
                      No accounts found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Security Tip */}
        <Card className="border-purple-200 bg-purple-50/60">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-purple-100">
              <Shield className="size-5 text-purple-600" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">Keep your accounts secure</p>

              <p className="mt-1 text-xs text-muted-foreground">
                Enable two-factor authentication and regular alerts to keep your
                accounts safe.
              </p>
            </div>

            <Button
              variant="outline"
              className="hidden shrink-0 bg-background sm:flex"
            >
              Security Settings
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="size-8 shrink-0 text-purple-600 hover:bg-purple-100"
            >
              <X className="size-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* ================================================================== */}
      {/* Right Column                                                       */}
      {/* ================================================================== */}

      <div className="min-w-0 space-y-4">
        {/* Balance Overview */}
        <Card>
          <CardHeader className="">
            <CardTitle className="text-md font-semibold">
              Balance Overview
            </CardTitle>
          </CardHeader>
          <Separator />

          <CardContent>
            <div className="flex items-center gap-4">
              {/* Donut */}
              <div className="relative size-24 shrink-0">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "conic-gradient(#7c3aed 0deg 229deg, #3b82f6 229deg 295deg, #f59e0b 295deg 360deg)",
                  }}
                />

                <div className="absolute inset-4.25 rounded-full bg-background" />
              </div>

              {/* Legend */}
              <div className="min-w-0 flex-1 space-y-3 text-xs">
                <BalanceLegend
                  color="bg-purple-500"
                  label="Bank Accounts"
                  percentage="63.5%"
                />

                <BalanceLegend
                  color="bg-blue-500"
                  label="Credit Cards"
                  percentage="18.3%"
                />

                <BalanceLegend
                  color="bg-orange-500"
                  label="E-Wallets & Cash"
                  percentage="18.2%"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-1 bg-white px-4 py-2">
            <p className="text-xs text-muted-foreground">Total Balance</p>

            <p className="text-xl font-bold">
              {formatCurrencyWithDigits(totalBalance)}
            </p>
          </CardFooter>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-md font-semibold">
              Recent Account Activity
            </CardTitle>

            <Button
              variant="ghost"
              className="h-auto px-0 text-xs font-medium text-primary hover:bg-transparent"
            >
              View All
            </Button>
          </CardHeader>
          <Separator />

          <CardContent className="space-y-1">
            {accountActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-3 border-b py-2 last:border-0"
              >
                {/* Icon */}
                <div
                  className={`flex size-8 shrink-0 items-center justify-center rounded-full ${getActivityIconClass(
                    activity.type
                  )}`}
                >
                  {activity.type === "income" ? (
                    <ArrowDown className="size-4" />
                  ) : (
                    <ArrowUp className="size-4" />
                  )}
                </div>

                {/* Details */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium">
                    {activity.account}
                  </p>

                  <p className="truncate text-[11px] text-muted-foreground">
                    {activity.description}
                  </p>

                  <p className="text-[10px] text-muted-foreground">
                    {activity.date}
                  </p>
                </div>

                {/* Amount */}
                <span
                  className={`shrink-0 text-xs font-semibold ${
                    activity.type === "income"
                      ? "text-emerald-600"
                      : "text-red-500"
                  }`}
                >
                  {activity.type === "income" ? "+" : "-"}
                  {formatCurrencyWithDigits(activity.amount)}
                </span>
              </div>
            ))}

            <div className="pt-3 text-center">
              <Button
                variant="ghost"
                className="h-auto gap-1 px-0 text-xs font-medium text-primary hover:bg-transparent"
              >
                View All Activity
                <ChevronRight className="size-3.5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Balance Legend                                                             */
/* -------------------------------------------------------------------------- */

function BalanceLegend({
  color,
  label,
  percentage,
}: {
  color: string
  label: string
  percentage: string
}) {
  return (
    <div className="flex items-center gap-2">
      <span className={`size-2 rounded-sm ${color}`} />

      <span className="min-w-0 flex-1 truncate">{label}</span>

      <span className="font-medium text-muted-foreground">{percentage}</span>
    </div>
  )
}
