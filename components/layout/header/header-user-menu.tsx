import Link from "next/link"
import { auth } from "@/lib/auth"
import { LogOut, Settings, User } from "lucide-react"

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

// type Session = typeof auth.$Infer.Session

// export function HeaderUserMenu({ data }: { data: Session | null }) {
export function HeaderUserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" className="h-10 gap-2 px-1.5 hover:bg-muted">
            <Avatar className="size-9">
              <AvatarImage src="/avatar.png" alt="Profile" />
              <AvatarFallback>SM</AvatarFallback>
              {/* <AvatarFallback>{data?.user.name}</AvatarFallback> */}
            </Avatar>
          </Button>
        }
      />

      <DropdownMenuContent className="w-40" align="start">
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>

          <DropdownMenuItem
            render={
              <Link href="/profile" className="flex items-center gap-3">
                <User className="size-4" />
                Profile
              </Link>
            }
          />

          <DropdownMenuItem
            render={
              <Link href="/settings" className="flex items-center gap-3">
                <Settings className="size-4" />
                Settings
              </Link>
            }
          />
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            render={
              <Link
                href="/"
                className="flex items-center gap-3 text-destructive"
              >
                <LogOut className="size-4" />
                Log out
              </Link>
            }
          />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
