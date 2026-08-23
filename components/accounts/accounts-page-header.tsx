"use client"

import PageHeader from "@/components/shared/page-header"
import { AddAccountDialog } from "./add-account-dialog"

export function AccountsPageHeader() {
  return (
    <PageHeader
      title="Accounts"
      subTitle="View and manage all your account in one place"
      action={
        <AddAccountDialog
          onSave={(account) => {
            console.log("Account saved:", account)
          }}
        />
      }
    />
  )
}
