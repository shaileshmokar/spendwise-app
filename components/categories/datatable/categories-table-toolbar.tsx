"use client"

import { Filter, Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import type { CategoryType } from "@/type/categories"

import type { CategoriesTableFeatures } from "./categories-table-features"

import type { ReactTable } from "@tanstack/react-table"

type CategoriesTable = ReactTable<
  CategoriesTableFeatures,
  {
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
>

type Props = {
  table: CategoriesTable
}

export function CategoriesTableToolbar({ table }: Props) {
  const search = String(table.state.globalFilter ?? "")

  const hasFilters = search.length > 0

  return (
    <div className="flex flex-wrap items-center gap-2 border-b p-3">
      {/* Search */}

      <div className="relative min-w-50 flex-1">
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          value={search}
          onChange={(event) => {
            table.setGlobalFilter(event.target.value)
          }}
          placeholder="Search categories..."
          className="h-9 w-full pl-9"
        />
      </div>

      {/* Type */}

      <Select
        value={String(table.getColumn("type")?.getFilterValue() ?? "all")}
        onValueChange={(value) => {
          table
            .getColumn("type")
            ?.setFilterValue(value === "All Types" ? undefined : value)
        }}
      >
        <SelectTrigger className="h-9 w-40 shrink-0">
          <Filter className="size-4 text-muted-foreground" />

          <SelectValue placeholder="All Types" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="All Types">All Types</SelectItem>

          <SelectItem value="expense">Expense</SelectItem>

          <SelectItem value="income">Income</SelectItem>
        </SelectContent>
      </Select>

      {/* Reset */}

      {hasFilters && (
        <Button
          variant="ghost"
          size="sm"
          className="h-9 gap-1.5"
          onClick={() => {
            table.resetGlobalFilter(true)
            table.resetColumnFilters(true)
          }}
        >
          <X className="size-4" />
          Reset
        </Button>
      )}
    </div>
  )
}
