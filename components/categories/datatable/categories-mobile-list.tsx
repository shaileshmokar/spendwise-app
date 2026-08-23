"use client"

import type { Row, ReactTable } from "@tanstack/react-table"
import { Edit, Trash2, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatCurrencyWithDigits } from "@/lib/utils"
import type { Category } from "@/type/categories"
import type { CategoriesTableFeatures } from "./categories-table-features"

type CategoriesTable = ReactTable<CategoriesTableFeatures, Category>

type Props = {
  table: CategoriesTable
}

export function CategoriesMobileList({ table }: Props) {
  const rows = table.getRowModel().rows

  if (!rows.length) {
    return (
      <EmptyMobileState
        onReset={() => {
          table.resetGlobalFilter(true)
          table.resetColumnFilters(true)
        }}
      />
    )
  }

  return (
    <div className="divide-y md:hidden">
      {rows.map((row) => (
        <CategoryMobileCard key={row.id} row={row} />
      ))}
    </div>
  )
}

function CategoryMobileCard({
  row,
}: {
  row: Row<CategoriesTableFeatures, Category>
}) {
  const category = row.original
  const Icon = category.icon

  const isIncome = category.type === "income"

  return (
    <div className="space-y-4 p-4">
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

        <Badge
          variant="secondary"
          className={
            isIncome
              ? "border-0 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
              : "border-0 bg-red-50 text-red-500 dark:bg-red-950/40 dark:text-red-400"
          }
        >
          {isIncome ? "↑" : "↓"} {isIncome ? "Income" : "Expense"}
        </Badge>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-2 gap-3 rounded-lg bg-muted/40 p-3">
        <div>
          <p className="text-xs text-muted-foreground">Transactions</p>

          <p className="mt-1 text-sm font-semibold">{category.transactions}</p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">Total Amount</p>

          <p className="mt-1 text-sm font-semibold">
            {formatCurrencyWithDigits(category.totalAmount)}
          </p>
        </div>

        <div className="col-span-2">
          <div className="mb-1 flex items-center justify-between">
            <p className="text-xs text-muted-foreground">% of Expenses</p>

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
}

function EmptyMobileState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex h-32 flex-col items-center justify-center gap-2 md:hidden">
      <Wallet className="size-8 text-muted-foreground" />

      <p className="text-sm font-medium">No categories found</p>

      <Button variant="ghost" size="sm" onClick={onReset}>
        Reset filters
      </Button>
    </div>
  )
}
