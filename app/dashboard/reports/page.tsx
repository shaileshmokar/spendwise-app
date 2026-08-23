import { Metadata } from "next"
import PageContainer from "@/components/shared/page-container"
import PageHeader from "@/components/shared/page-header"
import { StatsCards } from "@/components/shared/stats-cards"
import { reportsStats } from "@/data/reports"

export const metadata: Metadata = {
  title: "Reports",
}

export default function Page() {
  return (
    <PageContainer>
      {/* Page Header */}
      <PageHeader
        title="Reports"
        subTitle="Analyze your income, expenses and savings"
        // showAddButton={false}
      />

      {/* KPI Cards */}
      <StatsCards stats={reportsStats} />
    </PageContainer>
  )
}
