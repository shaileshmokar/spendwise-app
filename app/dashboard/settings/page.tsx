import { Metadata } from "next"
import PageContainer from "@/components/shared/page-container"
import PageHeader from "@/components/shared/page-header"
import SettingsPage from "@/components/settings/settings-page"

export const metadata: Metadata = {
  title: "Settings",
}

export default function Page() {
  return (
    <PageContainer>
      {/* Page Header */}
      <PageHeader
        title="Settings"
        subTitle="Manage your profiles, references and account settings"
        // showAddButton={false}
      />

      {/* Settings */}
      <SettingsPage />
    </PageContainer>
  )
}
