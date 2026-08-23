import { Metadata } from "next"

import PageContainer from "@/components/shared/page-container"
import { StatsCards } from "@/components/shared/stats-cards"
// import { CategoriesTable } from "@/components/categories/categories-table"
import { CategoriesPageHeader } from "@/components/categories/categories-page-header"
import { CategoriesTable } from "@/components/categories/datatable/categories-table"

import { getCategoriesData } from "@/services/category.service"

export const metadata: Metadata = {
  title: "Categories",
}

export default async function Page() {
  const categories = await getCategoriesData()

  return (
    <PageContainer>
      {/* Page Header */}
      <CategoriesPageHeader />

      {/* KPI Cards */}
      <StatsCards stats={categories.stats} />

      {/* Categories Table */}
      <CategoriesTable />
    </PageContainer>
  )
}
