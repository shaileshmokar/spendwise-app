"use client"

import * as React from "react"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Edit,
  Filter,
  Trash2,
  Wallet,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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

import { CategoryType } from "@/type/categories"
import { categoriesList } from "@/data/categories"
import { formatCurrencyWithDigits } from "@/lib/utils"

export function CategoriesTable() {
  const [search, setSearch] = React.useState("")
  const [type, setType] = React.useState<"all" | CategoryType>("all")
  const [page, setPage] = React.useState(1)

  const itemsPerPage = 10

  const filteredCategories = React.useMemo(() => {
    return categoriesList.filter((category) => {
      const matchesSearch =
        category.name.toLowerCase().includes(search.toLowerCase()) ||
        category.description.toLowerCase().includes(search.toLowerCase())

      const matchesType = type === "all" || category.type === type

      return matchesSearch && matchesType
    })
  }, [search, type])

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage)

  const paginatedCategories = filteredCategories.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )

  React.useEffect(() => {
    setPage(1)
  }, [search, type])

  const handleReset = () => {
    setSearch("")
    setType("all")
    setPage(1)
  }

  return (
    <div className="w-full overflow-hidden rounded-xl border bg-card">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 border-b p-3">
        {/* Search */}
        <div className="relative min-w-50 flex-1">
          <SearchIcon />

          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search categories..."
            className="h-9 w-full pl-9"
          />
        </div>

        {/* Type Filter */}
        <Select
          value={type}
          onValueChange={(value) => setType(value as "all" | CategoryType)}
        >
          <SelectTrigger className="h-9 w-40 shrink-0">
            <Filter className="size-4 text-muted-foreground" />

            <SelectValue placeholder="All Types" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="expense">Expense</SelectItem>
            <SelectItem value="income">Income</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="min-w-60">Category</TableHead>

              <TableHead>Type</TableHead>

              <TableHead className="text-center">Transactions</TableHead>

              <TableHead className="text-right">Total Amount</TableHead>

              <TableHead className="w-37.5">% of Expenses</TableHead>

              <TableHead className="w-27.5 text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedCategories.length > 0 ? (
              paginatedCategories.map((category) => {
                const Icon = category.icon

                return (
                  <TableRow key={category.id}>
                    {/* Category */}
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex size-9 shrink-0 items-center justify-center rounded-lg text-white ${category.color}`}
                        >
                          <Icon className="size-5" />
                        </div>

                        <div className="min-w-0">
                          <div className="truncate text-sm font-semibold tracking-wide">
                            {category.name}
                          </div>

                          <div className="truncate text-xs text-muted-foreground">
                            {category.description}
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    {/* Type */}
                    <TableCell>
                      <CategoryTypeBadge type={category.type} />
                    </TableCell>

                    {/* Transactions */}
                    <TableCell className="text-center text-sm font-medium">
                      {category.transactions}
                    </TableCell>

                    {/* Amount */}
                    <TableCell className="text-right text-sm font-medium">
                      {formatCurrencyWithDigits(category.totalAmount)}
                    </TableCell>

                    {/* Percentage */}
                    <TableCell>
                      <div className="w-27.5">
                        <div className="mb-1 text-xs font-medium text-muted-foreground">
                          {category.percentage}%
                        </div>

                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                          <div
                            className={`h-full rounded-full ${category.color}`}
                            style={{
                              width: `${Math.min(category.percentage, 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    </TableCell>

                    {/* Actions */}
                    <TableCell>
                      <div className="flex items-center justify-center gap-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="size-8"
                          aria-label={`Edit ${category.name}`}
                        >
                          <Edit className="size-4" />
                        </Button>

                        <Button
                          variant="outline"
                          size="icon"
                          className="size-8 text-destructive hover:text-destructive"
                          aria-label={`Delete ${category.name}`}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Wallet className="size-8 text-muted-foreground" />

                    <p className="text-sm font-medium">No categories found</p>

                    <Button variant="ghost" size="sm" onClick={handleReset}>
                      Reset filters
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile */}
      <div className="divide-y md:hidden">
        {paginatedCategories.length > 0 ? (
          paginatedCategories.map((category) => {
            const Icon = category.icon

            return (
              <div key={category.id} className="space-y-4 p-4">
                {/* Category */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className={`flex size-10 shrink-0 items-center justify-center rounded-lg text-white ${category.color}`}
                    >
                      <Icon className="size-5" />
                    </div>

                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold">
                        {category.name}
                      </div>

                      <div className="truncate text-xs text-muted-foreground">
                        {category.description}
                      </div>
                    </div>
                  </div>

                  <CategoryTypeBadge type={category.type} />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 rounded-lg bg-muted/40 p-3">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Transactions
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {category.transactions}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Total Amount
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {formatCurrencyWithDigits(category.totalAmount)}
                    </p>
                  </div>

                  <div className="col-span-2">
                    <div className="mb-1 flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">
                        % of Expenses
                      </p>

                      <span className="text-xs font-semibold">
                        {category.percentage}%
                      </span>
                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full rounded-full ${category.color}`}
                        style={{
                          width: `${Math.min(category.percentage, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Edit className="size-4" />
                    Edit
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                    Delete
                  </Button>
                </div>
              </div>
            )
          })
        ) : (
          <div className="flex h-32 flex-col items-center justify-center gap-2">
            <Wallet className="size-8 text-muted-foreground" />

            <p className="text-sm font-medium">No categories found</p>

            <Button variant="ghost" size="sm" onClick={handleReset}>
              Reset filters
            </Button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-3 border-t px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xs text-muted-foreground">
          Showing{" "}
          {filteredCategories.length === 0 ? 0 : (page - 1) * itemsPerPage + 1}{" "}
          to {Math.min(page * itemsPerPage, filteredCategories.length)} of{" "}
          {filteredCategories.length} categories
        </div>

        <div className="flex items-center justify-end gap-1">
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            disabled={page === 1}
            onClick={() => setPage((current) => Math.max(current - 1, 1))}
          >
            <ChevronLeftIcon />
          </Button>

          {Array.from({ length: totalPages }, (_, index) => {
            const pageNumber = index + 1

            return (
              <Button
                key={pageNumber}
                variant={page === pageNumber ? "default" : "outline"}
                size="icon"
                className="size-8"
                onClick={() => setPage(pageNumber)}
              >
                {pageNumber}
              </Button>
            )
          })}

          <Button
            variant="outline"
            size="icon"
            className="size-8"
            disabled={page === totalPages || totalPages === 0}
            onClick={() =>
              setPage((current) => Math.min(current + 1, totalPages))
            }
          >
            <ChevronRightIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}

/* ---------------------------------- */
/* Helpers */
/* ---------------------------------- */

function SearchIcon() {
  return (
    <svg
      className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

function CategoryTypeBadge({ type }: { type: CategoryType }) {
  const isIncome = type === "income"

  return (
    <Badge
      variant="secondary"
      className={
        isIncome
          ? "border-0 bg-emerald-50 text-emerald-600 hover:bg-emerald-50"
          : "border-0 bg-red-50 text-red-500 hover:bg-red-50"
      }
    >
      <span className="mr-1">{isIncome ? "↑" : "↓"}</span>

      {isIncome ? "Income" : "Expense"}
    </Badge>
  )
}
