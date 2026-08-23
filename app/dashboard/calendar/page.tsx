import { Metadata } from "next"
import PageContainer from "@/components/shared/page-container"
import PageHeader from "@/components/shared/page-header"
import CalendarPage from "@/components/calendar/calendar-page"
import CalendarTab from "@/components/calendar/calendar-tab"

export const metadata: Metadata = {
  title: "Categories",
}

export default function Page() {
  return (
    <PageContainer>
      {/* <PageHeader
        title="Calendar"
        subTitle="Manage your expense and income categories."
        addButtonText="Category"
      /> */}
      {/* KPI Cards */}

      {/* Table */}
      <CalendarPage />

      <CalendarTab />
    </PageContainer>
  )
}
