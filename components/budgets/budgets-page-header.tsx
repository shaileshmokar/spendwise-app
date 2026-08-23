"use client"

import PageHeader from "@/components/shared/page-header"
import { AddBudgetDialog } from "./add-budget-dialog"

export function BudgetsPageHeader() {
  return (
    <PageHeader
      title="Budgets"
      subTitle="View, search and manage all your budgets."
      action={
        <AddBudgetDialog
          onSave={(budget) => {
            console.log("Budget saved:", budget)
          }}
        />
      }
    />
  )
}
