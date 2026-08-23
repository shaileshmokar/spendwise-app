"use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb"

import Link from "next/link"
import { usePathname } from "next/navigation"

const routeLabels: Record<string, string> = {
  dashboard: "Dashboard",
  transaction: "Transactions",
  categories: "Categories",
  settings: "Settings",
}

export default function AppBreadCrumb() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="text-white">
          {segments.length === 0 ? (
            <BreadcrumbPage className="text-white">Home</BreadcrumbPage>
          ) : (
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          )}
        </BreadcrumbItem>

        {segments.map((segment, index) => {
          const href = "/" + segments.slice(0, index + 1).join("/")
          const isLast = index === segments.length - 1

          const label =
            routeLabels[segment] ||
            segment.charAt(0).toUpperCase() + segment.slice(1)

          return (
            <div key={segment} className="flex items-center gap-2 text-white">
              <BreadcrumbSeparator />

              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="text-white">
                    {label}
                  </BreadcrumbPage>
                ) : (
                  //   <BreadcrumbLink asChild>
                  <BreadcrumbLink className="text-white">
                    <Link href={href}>{label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
