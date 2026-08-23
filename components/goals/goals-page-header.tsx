// "use client"

// import * as React from "react"

// import PageHeader from "@/components/shared/page-header"
// import { AddGoalDialog } from "./add-goals-dialog"

// export function GoalsPageHeader() {
//   const [open, setOpen] = React.useState(false)

//   return (
//     <>
//       <PageHeader
//         title="Goals"
//         subTitle="Plan, save and achieve your financial goals"
//         addButtonText="Goal"
//         onAdd={() => setOpen(true)}
//       />

//       <AddGoalDialog
//         open={open}
//         onOpenChange={setOpen}
//         onSave={(goal) => {
//           console.log("Goal saved:", goal)
//           // Later:
//           // await createGoal(goal)
//         }}
//       />
//     </>
//   )
// }

"use client"

import PageHeader from "@/components/shared/page-header"
import { AddGoalDialog } from "./add-goals-dialog"

export function GoalsPageHeader() {
  return (
    <PageHeader
      title="Goals"
      subTitle="Plan, save and achieve your financial goals"
      action={
        <AddGoalDialog
          onSave={(goal) => {
            console.log("Goal saved:", goal)
          }}
        />
      }
    />
  )
}
