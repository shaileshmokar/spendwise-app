// "use client"

// import * as React from "react"

// import PageHeader from "@/components/shared/page-header"
// import { AddCategoryDialog } from "./add-category-dialog"

// export function CategoriesPageHeader() {
//   const [open, setOpen] = React.useState(false)

//   return (
//     <>
//       <PageHeader
//         title="Categories"
//         subTitle="Manage your expense and income categories."
//         addButtonText="Category"
//         onAdd={() => setOpen(true)}
//       />

//       <AddCategoryDialog
//         open={open}
//         onOpenChange={setOpen}
//         onSave={(category) => {
//           console.log("Category saved:", category)

//           // Later:
//           // await createCategory(category)
//         }}
//       />
//     </>
//   )
// }

"use client"

import PageHeader from "@/components/shared/page-header"
import { AddCategoryDialog } from "./add-category-dialog"

export function CategoriesPageHeader() {
  return (
    <PageHeader
      title="Categories"
      subTitle="Manage your expense and income categories."
      action={
        <AddCategoryDialog
          onSave={(category) => {
            console.log("Category saved:", category)
          }}
        />
      }
    />
  )
}
