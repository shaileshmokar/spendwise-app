// import {
//   columnFilteringFeature,
//   createFilteredRowModel,
//   createPaginatedRowModel,
//   createSortedRowModel,
//   globalFilteringFeature,
//   rowPaginationFeature,
//   rowSortingFeature,
//   sortFn_alphanumeric,
//   sortFn_basic,
//   tableFeatures,
// } from "@tanstack/react-table"

// export const categoriesTableFeatures = tableFeatures({
//   // Filtering
//   columnFilteringFeature,
//   globalFilteringFeature,
//   filteredRowModel: createFilteredRowModel(),

//   // Sorting
//   rowSortingFeature,
//   sortedRowModel: createSortedRowModel(),

//   // Pagination
//   rowPaginationFeature,
//   paginatedRowModel: createPaginatedRowModel(),

//   // Sort functions used by our columns
//   sortFns: {
//     alphanumeric: sortFn_alphanumeric,
//     basic: sortFn_basic,
//   },
// })

// export type CategoriesTableFeatures = typeof categoriesTableFeatures

import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_basic,
  tableFeatures,
} from "@tanstack/react-table"

export const categoriesTableFeatures = tableFeatures({
  // Filtering
  columnFilteringFeature,
  globalFilteringFeature,
  filteredRowModel: createFilteredRowModel(),

  // Sorting
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),

  // Pagination
  rowPaginationFeature,
  paginatedRowModel: createPaginatedRowModel(),

  // Column visibility
  columnVisibilityFeature,

  // Sorting functions
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
    basic: sortFn_basic,
  },
})

export type CategoriesTableFeatures = typeof categoriesTableFeatures
