import { Metadata } from "next"
import PageContainer from "@/components/shared/page-container"
import { BudgetsPageHeader } from "@/components/budgets/budgets-page-header"
import { StatsCards } from "@/components/shared/stats-cards"
import { budgetsStats } from "@/data/budgets"
import BudgetList from "@/components/budgets/budget-list"

export const metadata: Metadata = {
  title: "Budgets",
}

export default function Page() {
  return (
    <PageContainer>
      {/* Page Header */}
      <BudgetsPageHeader />

      {/* KPI Cards */}
      <StatsCards stats={budgetsStats} />

      {/* Budget List */}
      <BudgetList />
    </PageContainer>
  )
}
