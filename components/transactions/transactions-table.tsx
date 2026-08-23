"use client"

import * as React from "react"
import {
  ArrowDown,
  ArrowUp,
  Filter,
  MoreVertical,
  RotateCcw,
  Search,
  ShoppingCart,
  BriefcaseBusiness,
  CreditCard,
  Car,
  House,
  Utensils,
  Zap,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { categories } from "@/data/categories"
import { accounts } from "@/data/accounts"
import { type Transaction } from "@/type/transactions"

const transactionIcons = {
  "shopping-cart": ShoppingCart,
  briefcase: BriefcaseBusiness,
  "credit-card": CreditCard,
  car: Car,
  house: House,
  utensils: Utensils,
  zap: Zap,
} as const

type TransactionTableProps = {
  data: Transaction[]
}
export function TransactionsTable({ data }: TransactionTableProps) {
  const [search, setSearch] = React.useState("")
  const [category, setCategory] = React.useState("all")
  const [account, setAccount] = React.useState("all")
  const [type, setType] = React.useState("all")
  const [selected, setSelected] = React.useState<string[]>([])

  const filteredTransactions = data.filter((transaction) => {
    const matchesSearch =
      transaction.description.toLowerCase().includes(search.toLowerCase()) ||
      transaction.category.toLowerCase().includes(search.toLowerCase())

    const matchesCategory =
      category === "all" || transaction.category === category

    const matchesAccount = account === "all" || transaction.account === account

    const matchesType = type === "all" || transaction.type === type

    return matchesSearch && matchesCategory && matchesAccount && matchesType
  })

  const allSelected =
    filteredTransactions.length > 0 &&
    filteredTransactions.every((transaction) =>
      selected.includes(transaction.id)
    )

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelected([])
    } else {
      setSelected(filteredTransactions.map((transaction) => transaction.id))
    }
  }

  const toggleSelect = (id: string) => {
    setSelected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    )
  }

  const resetFilters = () => {
    setSearch("")
    setCategory("all")
    setAccount("all")
    setType("all")
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      {/* Filters */}
      <div className="flex w-full flex-wrap items-center gap-2 border-b p-3">
        {/* Search */}
        <div className="relative min-w-50 flex-1">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, category, or note..."
            className="h-9 w-full pl-9"
          />
        </div>

        {/* Category */}
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="h-9 w-40 shrink-0">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>

            {categories.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Account */}
        <Select value={account} onValueChange={setAccount}>
          <SelectTrigger className="h-9 w-40 shrink-0">
            <SelectValue placeholder="All Accounts" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Accounts</SelectItem>

            {accounts.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Type */}
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="h-9 w-36 shrink-0">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="income">Income</SelectItem>
            <SelectItem value="expense">Expense</SelectItem>
          </SelectContent>
        </Select>

        {/* Filters */}
        <Button variant="outline" size="sm" className="h-9 shrink-0">
          <Filter className="size-4" />
          <span className="hidden sm:inline">Filters</span>
        </Button>

        {/* Reset */}
        <Button
          variant="outline"
          size="sm"
          className="h-9 shrink-0"
          onClick={resetFilters}
        >
          <RotateCcw className="size-4" />
          <span className="hidden sm:inline">Reset</span>
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table className="min-w-250">
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>

              <TableHead>
                <div className="flex items-center gap-1">
                  Date
                  <ArrowDown className="size-3" />
                </div>
              </TableHead>

              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Account</TableHead>
              <TableHead>Type</TableHead>

              <TableHead>
                <div className="flex items-center gap-1">
                  Amount
                  <ArrowDown className="size-3" />
                </div>
              </TableHead>

              <TableHead>Status</TableHead>

              <TableHead className="w-10">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TransactionRow
                key={transaction.id}
                transaction={transaction}
                selected={selected.includes(transaction.id)}
                onSelect={() => toggleSelect(transaction.id)}
              />
            ))}

            {filteredTransactions.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} className="h-32 text-center">
                  No transactions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <TransactionPagination
        total={128}
        currentCount={filteredTransactions.length}
      />
    </div>
  )
}

function TransactionRow({
  transaction,
  selected,
  onSelect,
}: {
  transaction: Transaction
  selected: boolean
  onSelect: () => void
}) {
  // const Icon = transaction.icon

  const Icon = transactionIcons[transaction.icon]

  return (
    <TableRow>
      {/* Checkbox */}
      <TableCell>
        <Checkbox checked={selected} onCheckedChange={onSelect} />
      </TableCell>

      {/* Date */}
      <TableCell className="whitespace-nowrap">
        <div className="text-xs font-medium">{transaction.date}</div>

        <div className="text-xs text-muted-foreground">{transaction.time}</div>
      </TableCell>

      {/* Description */}
      <TableCell>
        <div className="flex items-center gap-3">
          <div
            className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${transaction.iconBgClass}`}
          >
            <Icon className={`size-4 ${transaction.iconClass}`} />
          </div>

          <div className="min-w-0">
            <div className="truncate text-sm font-medium">
              {transaction.description}
            </div>

            <div className="truncate text-xs text-muted-foreground">
              {transaction.subDescription}
            </div>
          </div>
        </div>
      </TableCell>

      {/* Category */}
      <TableCell>
        <div className="flex items-center gap-2 text-sm whitespace-nowrap">
          <span
            className={`size-2 rounded-full ${transaction.categoryColor}`}
          />

          {transaction.category}
        </div>
      </TableCell>

      {/* Account */}
      <TableCell>
        <div className="whitespace-nowrap">
          <div className="text-sm">{transaction.account}</div>

          <div className="text-xs text-muted-foreground">
            •••• {transaction.accountNumber}
          </div>
        </div>
      </TableCell>

      {/* Type */}
      <TableCell>
        {transaction.type === "income" ? (
          <Badge
            variant="secondary"
            className="bg-emerald-50 text-emerald-600 hover:bg-emerald-50"
          >
            <ArrowUp className="size-3" />
            Income
          </Badge>
        ) : (
          <Badge
            variant="secondary"
            className="bg-red-50 text-red-500 hover:bg-red-50"
          >
            <ArrowDown className="size-3" />
            Expense
          </Badge>
        )}
      </TableCell>

      {/* Amount */}
      <TableCell>
        <span
          className={
            transaction.type === "income"
              ? "font-semibold text-emerald-500"
              : "font-semibold text-red-500"
          }
        >
          {transaction.type === "income" ? "+" : "-"}₹
          {transaction.amount.toLocaleString("en-IN")}.00
        </span>
      </TableCell>

      {/* Status */}
      <TableCell>
        <Badge
          variant="secondary"
          className="bg-emerald-50 text-emerald-600 hover:bg-emerald-50"
        >
          ✓ {transaction.status}
        </Badge>
      </TableCell>

      {/* Actions */}
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" size="icon" className="size-8">
                <MoreVertical className="size-4" />
              </Button>
            }
          />

          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Edit Transaction</DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="text-destructive">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}

function TransactionPagination({
  total,
  currentCount,
}: {
  total: number
  currentCount: number
}) {
  return (
    <div className="flex flex-col gap-3 border-t px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between">
      {/* Count */}
      <div className="text-xs text-muted-foreground">
        Showing 1 to {currentCount} of {total} transactions
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" className="size-8">
            ‹
          </Button>

          <Button size="icon" className="size-8">
            1
          </Button>

          <Button variant="outline" size="icon" className="size-8">
            2
          </Button>

          <Button variant="outline" size="icon" className="size-8">
            3
          </Button>

          <Button variant="outline" size="icon" className="size-8">
            4
          </Button>

          <Button variant="outline" size="icon" className="size-8">
            5
          </Button>

          <span className="px-1 text-muted-foreground">...</span>

          <Button variant="outline" size="icon" className="size-8">
            13
          </Button>

          <Button variant="outline" size="icon" className="size-8">
            ›
          </Button>
        </div>

        <Select defaultValue="10">
          <SelectTrigger className="h-8 w-27">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="10">10 per page</SelectItem>
            <SelectItem value="20">20 per page</SelectItem>
            <SelectItem value="50">50 per page</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
