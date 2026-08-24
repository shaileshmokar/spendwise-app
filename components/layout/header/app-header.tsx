"use client"

import { auth } from "@/lib/auth"

import { SidebarTrigger } from "@/components/ui/sidebar"

import { HeaderSearch } from "./header-search"
import { HeaderNotifications } from "./header-notifications"
import { HeaderDateRange } from "./header-date-range"
import { HeaderAddTransaction } from "./header-add-transaction"
import { HeaderUserMenu } from "./header-user-menu"
import { HeaderThemeSwitcher } from "./header-theme-switcher"

type Session = typeof auth.$Infer.Session

export function AppHeader({ data }: { data: Session }) {
  // export function AppHeader() {
  // console.log("AppHeader Data", data)

  return (
    <header className="sticky top-0 z-10 flex h-16 w-full items-center gap-3 border-b bg-background px-2 lg:px-2">
      {/* Left */}
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <SidebarTrigger className="shrink-0 text-primary" />
        <HeaderSearch />
      </div>

      {/* Right */}
      <div className="flex shrink-0 items-center gap-2">
        {/* <HeaderDateRange /> */}
        {/* <HeaderAddTransaction /> */}
        <HeaderThemeSwitcher />
        {/* <HeaderNotifications /> */}
        <HeaderUserMenu data={data} />
        {/* <HeaderUserMenu /> */}
      </div>
    </header>
  )
}
