import { Geist_Mono, Inter, Outfit } from "next/font/google"

import "./../globals.css"
import { Metadata } from "next"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"

import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/providers/theme-provider"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { AppHeader } from "@/components/layout/header/app-header"
import { getSidebarState } from "@/lib/cookies"

const outfitHeading = Outfit({ subsets: ["latin"], variable: "--font-heading" })

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: {
    default: "SpendWise",
    template: "%s | SpendWise",
  },
  description: "Personal expense tracker",
  icons: {
    icon: "/icon.png",
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const defaultOpen = await getSidebarState()

  // const session = await auth.api.getSession({
  //   headers: await headers(),
  // })

  // if (!session) {
  //   redirect("/auth/login")
  // }

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable,
        outfitHeading.variable
      )}
    >
      <body>
        <ThemeProvider>
          <TooltipProvider>
            <SidebarProvider defaultOpen={defaultOpen}>
              <AppSidebar />
              <SidebarInset>
                {/* <AppHeader data={session} /> */}
                <AppHeader />

                <main>{children}</main>
              </SidebarInset>
            </SidebarProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
