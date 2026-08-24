import Link from "next/link"
import { auth } from "@/lib/auth"
import { Settings, User } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { LogoutButton } from "@/components/auth/logout-button"

type Session = typeof auth.$Infer.Session

export function HeaderUserMenu({ data }: { data: Session }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          // <Button variant="ghost" className="h-10 gap-2 px-1.5 hover:bg-muted">
          <Avatar className="hover:none size-9 cursor-pointer">
            <AvatarImage src="/avatar.png" alt="Profile" />
            <AvatarFallback className="border-blue-600 bg-blue-600 font-semibold text-white">
              {data?.user.name?.slice(0, 2).toUpperCase() ?? "SM"}
            </AvatarFallback>
          </Avatar>
          // </Button>
        }
      />

      <DropdownMenuContent className="w-40" align="start">
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>

          <DropdownMenuItem
            render={
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-3"
              >
                <User className="size-4" />
                Profile
              </Link>
            }
          />

          <DropdownMenuItem
            render={
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-3"
              >
                <Settings className="size-4" />
                Settings
              </Link>
            }
          />
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <LogoutButton />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
