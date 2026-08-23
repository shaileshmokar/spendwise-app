"use client"

import type { ReactTable } from "@tanstack/react-table"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Category } from "@/type/categories"
import type { CategoriesTableFeatures } from "./categories-table-features"

type CategoriesTable = ReactTable<CategoriesTableFeatures, Category>

type Props = {
  table: CategoriesTable
}

export function CategoriesPagination({ table }: Props) {
  const pageIndex = table.state.pagination.pageIndex

  const pageSize = table.state.pagination.pageSize

  const filteredRows = table.getFilteredRowModel().rows

  const totalRows = filteredRows.length

  const start = totalRows === 0 ? 0 : pageIndex * pageSize + 1

  const end = Math.min((pageIndex + 1) * pageSize, totalRows)

  const pageCount = table.getPageCount()

  return (
    <div className="flex flex-col gap-3 border-t px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Count */}

      <div className="text-xs text-muted-foreground">
        Showing <span className="font-medium text-foreground">{start}</span> to{" "}
        <span className="font-medium text-foreground">{end}</span> of{" "}
        <span className="font-medium text-foreground">{totalRows}</span>{" "}
        categories
      </div>

      {/* Controls */}

      <div className="flex items-center justify-end gap-1">
        <Button
          variant="outline"
          size="icon"
          className="size-8"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
          aria-label="Previous page"
        >
          <ChevronLeft className="size-4" />
        </Button>

        <div className="px-2 text-xs text-muted-foreground">
          Page{" "}
          <span className="font-medium text-foreground">{pageIndex + 1}</span>{" "}
          of{" "}
          <span className="font-medium text-foreground">{pageCount || 1}</span>
        </div>

        <Button
          variant="outline"
          size="icon"
          className="size-8"
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
          aria-label="Next page"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  )
}
