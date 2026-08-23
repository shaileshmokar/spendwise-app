import { Metadata } from "next"
import { getGreeting } from "@/lib/utils"

import PageContainer from "@/components/shared/page-container"
import PageHeader from "@/components/shared/page-header"
import { DashboardChartBar } from "@/components/dashboard/dashboard-bar-chart"
import { DashboardPieChart } from "@/components/dashboard/dashboard-pie-chart"
import { FinancialGoals } from "@/components/dashboard/financial-goals"
import { FinancialTips } from "@/components/dashboard/financial-tips"
import { BudgetOverviewChart } from "@/components/dashboard/budget-overview-chart"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { SpendingTrendChart } from "@/components/dashboard/spending-trend-chart"
import { UpcomingBills } from "@/components/dashboard/upcoming-bills"
import { StatsCards } from "@/components/shared/stats-cards"
import { getDashboardData } from "@/services/dashboard.service"

export const metadata: Metadata = {
  title: "Dashboard",
}

export default async function Page() {
  const dashboard = await getDashboardData()

  return (
    <PageContainer>
      {/* Page Header */}
      <PageHeader
        title={`${getGreeting()}, Shailesh! 👋`}
        subTitle="Here's what's happening with your finances this month."
        // showAddButton={false}
      />

      {/* KPI Cards */}
      <StatsCards stats={dashboard.stats} />

      {/* Charts */}
      <div className="grid w-full min-w-0 gap-4 md:grid-cols-1 lg:grid-cols-[4.5fr_4fr_3.5fr]">
        <div className="min-w-0">
          <DashboardChartBar data={dashboard.cashFlow} />
        </div>

        <div className="min-w-0">
          <DashboardPieChart data={dashboard.spendingByCategory} />
        </div>

        <div className="min-w-0">
          <BudgetOverviewChart data={dashboard.budgetOverview} />
        </div>
      </div>

      {/* Recent / Spending / Bills */}
      <div className="grid w-full min-w-0 gap-4 md:grid-cols-1 lg:grid-cols-[3.75fr_4.5fr_3.75fr]">
        <div className="min-w-0">
          <RecentTransactions data={dashboard.recentTransaction} />
        </div>

        <div className="min-w-0">
          <SpendingTrendChart data={dashboard.spendingTrend} />
        </div>

        <div className="min-w-0">
          <UpcomingBills data={dashboard.upcomingBills} />
        </div>
      </div>

      {/* Financial Goals / Tips */}
      <div className="grid w-full min-w-0 gap-4 md:grid-cols-2">
        <div>
          <FinancialGoals data={dashboard.financialGoal} />
        </div>
        <div>
          <FinancialTips data={dashboard.financialTip} />
        </div>
      </div>
    </PageContainer>
  )
}
