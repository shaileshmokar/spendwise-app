"use client"

import PageHeader from "@/components/shared/page-header"
import { AddTransactionDialog } from "./add-transaction-dialog"

export function TransactionsPageHeader() {
  return (
    <PageHeader
      title="Transaction"
      subTitle="View, search and manage all your transactions"
      action={
        <AddTransactionDialog
          onSave={(transaction) => {
            console.log("Transaction saved:", transaction)
          }}
        />
      }
    />
  )
}
