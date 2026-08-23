"use client"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Wallet } from "lucide-react"

export function AppLogo() {
  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center">
        <SidebarMenuButton
          size="lg"
          // className="data-open:bg-sidebar-accent data-open:text-sidebar-accent-foreground"
          className="hover:bg-transparent"
        >
          <div className="flex items-center justify-center gap-2">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <Wallet />
            </div>
            <div className="leading-tighter grid flex-1 text-left text-sm">
              <span className="truncate text-xl font-bold text-primary">
                SpendWise
              </span>
              {/* <span className="truncate text-xs">Expense Tracker</span> */}
            </div>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

// "use client"

// import {
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarTrigger,
// } from "@/components/ui/sidebar"
// import { Wallet } from "lucide-react"

// export function AppLogo() {
//   return (
//     <SidebarMenu>
//       <SidebarMenuItem>
//         <div className="group/logo relative">
//           {/* Logo */}
//           <SidebarMenuButton
//             size="lg"
//             className="data-open:bg-sidebar-accent data-open:text-sidebar-accent-foreground"
//           >
//             <div className="flex items-center justify-center gap-2">
//               {/* Logo Icon */}
//               <div className="flex aspect-square size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
//                 <Wallet className="size-5" />
//               </div>

//               {/* Logo Text */}
//               <div className="grid flex-1 text-left text-sm leading-tight">
//                 <span className="truncate font-mono text-xl font-bold text-primary">
//                   SpendWise
//                 </span>
//               </div>
//             </div>
//           </SidebarMenuButton>

//           {/* Sidebar Trigger */}
//           <SidebarTrigger className="absolute top-1/2 right-2 z-10 size-8 -translate-y-1/2 opacity-0 transition-opacity group-data-[state=collapsed]/sidebar:group-hover/logo:opacity-100" />
//         </div>
//       </SidebarMenuItem>
//     </SidebarMenu>
//   )
// }
