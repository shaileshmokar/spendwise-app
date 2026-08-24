"use client"

import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { authClient } from "@/lib/auth-client"
import { showSuccessToast } from "@/lib/toast-utils"

export function LogoutButton() {
  const router = useRouter()

  async function handleLogout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          showSuccessToast("Logout successfully")
          router.push("/")
          router.refresh()
        },
      },
    })
  }

  return (
    <DropdownMenuItem
      onClick={handleLogout}
      className="cursor-pointer text-destructive focus:text-destructive"
    >
      <LogOut className="size-4" />
      Log out
    </DropdownMenuItem>
  )
}
