"use client"

import * as React from "react"
import { SidebarNav } from "@/components/layout/sidebar-nav"
import { NavUser } from "@/components/layout/nav-user"
import { AppLogo } from "@/components/layout/app-logo"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { data } from "@/data/data"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      className="h-screen"
      variant="sidebar"
      {...props}
    >
      <div className="flex h-full flex-col">
        <SidebarHeader>
          <AppLogo />
        </SidebarHeader>
        <SidebarSeparator className="mx-0" />
        <SidebarContent>
          <SidebarNav items={data.navMain} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
      </div>
      <SidebarRail />
    </Sidebar>
  )
}
