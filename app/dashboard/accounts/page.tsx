import { Metadata } from "next"
import PageContainer from "@/components/shared/page-container"
import { AccountsPageHeader } from "@/components/accounts/accounts-page-header"
import AccountsPage from "@/components/accounts/accounts-page"
import { StatsCards } from "@/components/shared/stats-cards"
import { getAccountsData } from "@/services/account.service"

export const metadata: Metadata = {
  title: "Accounts",
}

export default async function Page() {
  const accounts = await getAccountsData()

  return (
    <PageContainer>
      {/* Page Header */}
      <AccountsPageHeader />

      {/* KPI Cards */}
      <StatsCards stats={accounts.stats} />

      {/* All Accounts  */}
      <AccountsPage />
    </PageContainer>
  )
}
