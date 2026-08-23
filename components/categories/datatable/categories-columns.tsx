"use client"

import { ArrowDown, ArrowUp, ArrowUpDown, Edit, Trash2 } from "lucide-react"

import { createColumnHelper, type ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatCurrencyWithDigits } from "@/lib/utils"
import type { Category, CategoryType } from "@/type/categories"

import type { CategoriesTableFeatures } from "./categories-table-features"

const columnHelper = createColumnHelper<CategoriesTableFeatures, Category>()

export const categoriesColumns = columnHelper.columns([
  /* -------------------------------- */
  /* Category */
  /* -------------------------------- */

  columnHelper.accessor("name", {
    header: ({ column }) => <SortableHeader column={column} label="Category" />,

    sortFn: "alphanumeric",

    cell: ({ row }) => {
      const category = row.original
      const Icon = category.icon

      return (
        <div className="flex items-center gap-3">
          <div
            className={`flex size-9 shrink-0 items-center justify-center rounded-lg text-white ${category.color}`}
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
      )
    },
  }),

  /* -------------------------------- */
  /* Type */
  /* -------------------------------- */

  columnHelper.accessor("type", {
    header: "Type",

    sortFn: "alphanumeric",

    filterFn: (row, columnId, filterValue) => {
      if (!filterValue) {
        return true
      }

      return row.getValue(columnId) === filterValue
    },

    cell: ({ row }) => <CategoryTypeBadge type={row.original.type} />,
  }),

  /* -------------------------------- */
  /* Transactions */
  /* -------------------------------- */

  columnHelper.accessor("transactions", {
    header: ({ column }) => (
      <div className="text-center">
        <SortableHeader column={column} label="Transactions" align="center" />
      </div>
    ),

    sortFn: "basic",

    cell: ({ row }) => (
      <div className="text-center text-sm font-medium">
        {row.original.transactions}
      </div>
    ),
  }),

  /* -------------------------------- */
  /* Total Amount */
  /* -------------------------------- */

  columnHelper.accessor("totalAmount", {
    header: ({ column }) => (
      <div className="flex justify-end">
        <SortableHeader column={column} label="Total Amount" />
      </div>
    ),

    sortFn: "basic",

    cell: ({ row }) => (
      <div className="text-right text-sm font-medium">
        {formatCurrencyWithDigits(row.original.totalAmount)}
      </div>
    ),
  }),

  /* -------------------------------- */
  /* Percentage */
  /* -------------------------------- */

  columnHelper.accessor("percentage", {
    header: ({ column }) => (
      <SortableHeader column={column} label="% of Expenses" />
    ),

    sortFn: "basic",

    cell: ({ row }) => {
      const category = row.original

      return (
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
      )
    },
  }),

  /* -------------------------------- */
  /* Actions */
  /* -------------------------------- */

  columnHelper.display({
    id: "actions",

    enableSorting: false,

    header: () => <div className="text-center">Actions</div>,

    cell: ({ row }) => {
      const category = row.original

      return (
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
      )
    },
  }),
])

/* ---------------------------------- */
/* Sortable Header */
/* ---------------------------------- */

function SortableHeader({
  column,
  label,
  align = "left",
}: {
  column: {
    toggleSorting: (desc?: boolean) => void
    getIsSorted: () => false | "asc" | "desc"
  }
  label: string
  align?: "left" | "center"
}) {
  const sorted = column.getIsSorted()

  return (
    <Button
      variant="ghost"
      size="sm"
      className={align === "center" ? "mx-auto h-8 px-2" : "h-8 px-2"}
      onClick={() => column.toggleSorting(sorted === "asc")}
    >
      {label}

      {sorted === "asc" ? (
        <ArrowUp className="ml-1.5 size-3.5" />
      ) : sorted === "desc" ? (
        <ArrowDown className="ml-1.5 size-3.5" />
      ) : (
        <ArrowUpDown className="ml-1.5 size-3.5 opacity-50" />
      )}
    </Button>
  )
}

/* ---------------------------------- */
/* Category Type Badge */
/* ---------------------------------- */

function CategoryTypeBadge({ type }: { type: CategoryType }) {
  const isIncome = type === "income"

  return (
    <Badge
      variant="secondary"
      className={
        isIncome
          ? "border-0 bg-emerald-50 text-emerald-600 hover:bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400"
          : "border-0 bg-red-50 text-red-500 hover:bg-red-50 dark:bg-red-950/40 dark:text-red-400"
      }
    >
      <span className="mr-1">{isIncome ? "↑" : "↓"}</span>

      {isIncome ? "Income" : "Expense"}
    </Badge>
  )
}
