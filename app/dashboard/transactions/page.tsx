import { Metadata } from "next"
import PageContainer from "@/components/shared/page-container"
import PageHeader from "@/components/shared/page-header"
import { StatsCards } from "@/components/shared/stats-cards"
import { TransactionsTable } from "@/components/transactions/transactions-table"

import { getTransactionsData } from "@/services/transaction.service"
import { TransactionsPageHeader } from "@/components/transactions/transactions-page-header"

export const metadata: Metadata = {
  title: "Transactions",
}

export default async function Page() {
  const transactions = await getTransactionsData()
  return (
    <PageContainer>
      {/* Page Header */}
      <TransactionsPageHeader />

      {/* KPI Cards */}
      <StatsCards stats={transactions.stats} />

      {/* Table */}
      <TransactionsTable data={transactions.transactionsList} />
    </PageContainer>
  )
}
