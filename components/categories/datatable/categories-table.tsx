// "use client"

// import * as React from "react"

// import {
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   useReactTable,
//   type ColumnFiltersState,
// } from "@tanstack/react-table"

// import { Filter, Search, Wallet } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"

// import { categoriesList } from "@/data/categories"
// import { CategoryType } from "@/type/categories"

// import { categoriesColumns } from "./categories-columns"

// export function CategoriesTable() {
//   const [globalFilter, setGlobalFilter] = React.useState("")
//   const [type, setType] = React.useState<"all" | CategoryType>("all")

//   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
//     []
//   )

//   const filteredData = React.useMemo(() => {
//     if (type === "all") {
//       return categoriesList
//     }

//     return categoriesList.filter((category) => category.type === type)
//   }, [type])

//   const table = useReactTable({
//     data: filteredData,
//     columns: categoriesColumns,

//     state: {
//       globalFilter,
//       columnFilters,
//     },

//     onGlobalFilterChange: setGlobalFilter,
//     onColumnFiltersChange: setColumnFilters,

//     getCoreRowModel: getCoreRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),

//     initialState: {
//       pagination: {
//         pageSize: 10,
//       },
//     },
//   })

//   const handleReset = () => {
//     setGlobalFilter("")
//     setType("all")
//     setColumnFilters([])
//     table.setPageIndex(0)
//   }

//   return (
//     <div className="w-full overflow-hidden rounded-xl border bg-card">
//       {/* Toolbar */}
//       <div className="flex flex-wrap items-center gap-2 border-b p-3">
//         {/* Search */}
//         <div className="relative min-w-50 flex-1">
//           <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

//           <Input
//             value={globalFilter}
//             onChange={(event) => {
//               setGlobalFilter(event.target.value)
//               table.setPageIndex(0)
//             }}
//             placeholder="Search categories..."
//             className="h-9 w-full pl-9"
//           />
//         </div>

//         {/* Type */}
//         <Select
//           value={type}
//           onValueChange={(value) => {
//             setType(value as "all" | CategoryType)
//             table.setPageIndex(0)
//           }}
//         >
//           <SelectTrigger className="h-9 w-40 shrink-0">
//             <Filter className="size-4 text-muted-foreground" />

//             <SelectValue placeholder="All Types" />
//           </SelectTrigger>

//           <SelectContent>
//             <SelectItem value="all">All Types</SelectItem>

//             <SelectItem value="expense">Expense</SelectItem>

//             <SelectItem value="income">Income</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       {/* Table */}
//       <div className="hidden md:block">
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id} className="hover:bg-transparent">
//                 {headerGroup.headers.map((header) => (
//                   <TableHead key={header.id}>
//                     {header.isPlaceholder
//                       ? null
//                       : flexRender(
//                           header.column.columnDef.header,
//                           header.getContext()
//                         )}
//                   </TableHead>
//                 ))}
//               </TableRow>
//             ))}
//           </TableHeader>

//           <TableBody>
//             {table.getRowModel().rows.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow key={row.id}>
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell
//                   colSpan={categoriesColumns.length}
//                   className="h-32 text-center"
//                 >
//                   <EmptyState onReset={handleReset} />
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>

//       {/* Mobile */}
//       <MobileCategories data={table.getRowModel().rows} onReset={handleReset} />

//       {/* Pagination */}
//       <CategoriesPagination table={table} />
//     </div>
//   )
// }

"use client"

import * as React from "react"

import { useTable, type RowData } from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { categoriesList } from "@/data/categories"
import type { Category } from "@/type/categories"

import { categoriesColumns } from "./categories-columns"
import { categoriesTableFeatures } from "./categories-table-features"
import { CategoriesTableToolbar } from "./categories-table-toolbar"
import { CategoriesPagination } from "./categories-pagination"
import { CategoriesMobileList } from "./categories-mobile-list"

// type CategoriesTableProps = {
//   data: Category[]
// }

export function CategoriesTable() {
  const data = React.useMemo<Category[]>(() => categoriesList, [])

  const table = useTable(
    {
      features: categoriesTableFeatures,

      data,

      columns: categoriesColumns,

      /*
       * Search:
       *
       * Search both category name and description.
       */
      globalFilterFn: (row, _columnId, filterValue) => {
        const search = String(filterValue ?? "")
          .trim()
          .toLowerCase()

        if (!search) {
          return true
        }

        const category = row.original

        return (
          category.name.toLowerCase().includes(search) ||
          category.description.toLowerCase().includes(search)
        )
      },

      /*
       * Initial pagination
       */
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 5,
        },
      },
    },
    (state) => state
  )

  const handleReset = () => {
    table.resetGlobalFilter(true)
    table.resetColumnFilters(true)
    table.resetSorting(true)
    table.setPageIndex(0)
  }

  return (
    <div className="w-full overflow-hidden rounded-xl border bg-card">
      {/* Toolbar */}
      <CategoriesTableToolbar table={table} />

      {/* Desktop */}
      <div className="hidden overflow-x-auto md:block">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <table.FlexRender header={header} />
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      <table.FlexRender cell={cell} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={categoriesColumns.length}
                  className="h-32 text-center"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="text-sm font-medium">
                      No categories found
                    </div>

                    <button
                      type="button"
                      className="text-sm text-primary hover:underline"
                      onClick={handleReset}
                    >
                      Reset filters
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile */}
      <CategoriesMobileList table={table} />

      {/* Pagination */}
      <CategoriesPagination table={table} />
    </div>
  )
}
