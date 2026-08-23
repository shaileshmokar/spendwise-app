// "use client"

// import Link from "next/link"
// import { usePathname } from "next/navigation"

// import {
//   SidebarGroup,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar"

// export function NavMain({
//   items,
// }: {
//   items: {
//     title: string
//     url: string
//     icon?: React.ReactNode
//   }[]
// }) {
//   const pathname = usePathname()

//   return (
//     <SidebarGroup>
//       <SidebarMenu>
//         {items.map((item) => {
//           const isActive =
//             pathname === item.url ||
//             (item.url !== "/" && pathname.startsWith(`${item.url}/`))

//           return (
//             <SidebarMenuItem key={item.title} className="h-11">
//               <SidebarMenuButton
//                 // asChild
//                 isActive={isActive}
//                 tooltip={item.title}
//                 className="py-5 data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=true]:hover:bg-primary"
//               >
//                 <Link
//                   href={item.url}
//                   className="flex w-full items-center gap-2"
//                 >
//                   {item.icon}
//                   <span>{item.title}</span>
//                 </Link>
//               </SidebarMenuButton>
//             </SidebarMenuItem>
//           )
//         })}
//       </SidebarMenu>
//     </SidebarGroup>
//   )
// }

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { CircleIcon, Mail, Plus } from "lucide-react"
import { Button } from "../ui/button"

export function SidebarNav({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: React.ReactNode
  }[]
}) {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      {/* <SidebarMenu>
        <SidebarMenuItem className="flex items-center">
          <SidebarMenuButton
            tooltip="Quick Create"
            className="h-11 bg-primary text-white"
          >
            <Plus />
            <span>Quick Create</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu> */}

      <SidebarMenu>
        {items.map((item) => {
          const isActive =
            pathname === item.url ||
            (item.url !== "/" && pathname.startsWith(`/dashboard/${item.url}/`))

          console.log("Sidebar - ", item, isActive)

          return (
            <SidebarMenuItem key={item.title} className="h-11">
              <SidebarMenuButton
                tooltip={item.title}
                isActive={isActive}

                render={
                  <Link
                    href={item.url}
                    // className={`py-5 ${isActive ? "bg-teal-600 text-white" : "bg-teal-600 text-white"}`}
                    className="py-5"
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                }
                // className={`py-5 ${isActive ? "text-green-900" : "bg-red-200"}`}
                // className="py-5 data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=true]:hover:bg-primary"
              />
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
