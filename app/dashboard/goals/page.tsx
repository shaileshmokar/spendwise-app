import { Metadata } from "next"
import PageContainer from "@/components/shared/page-container"
import GoalsList from "@/components/goals/goals-list"
import { StatsCards } from "@/components/shared/stats-cards"
import { goalsStats } from "@/data/goals"
import { GoalsPageHeader } from "@/components/goals/goals-page-header"

export const metadata: Metadata = {
  title: "Goals",
}

export default function Page() {
  return (
    <PageContainer>
      {/* Page Header */}
      <GoalsPageHeader />

      {/* KPI Cards */}
      <StatsCards stats={goalsStats} />

      {/* Goals List */}
      <GoalsList />
    </PageContainer>
  )
}
