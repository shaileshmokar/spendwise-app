"use client"

import { Check, Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const themes = [
  {
    value: "light",
    label: "Light",
    icon: Sun,
  },
  {
    value: "dark",
    label: "Dark",
    icon: Moon,
  },
  {
    value: "system",
    label: "System",
    icon: Monitor,
  },
] as const

export function HeaderThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="icon"
            className="size-10"
            aria-label="Change theme"
          >
            <Sun className="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />

            <span className="sr-only">Change theme</span>
          </Button>
        }
      />

      <DropdownMenuContent align="end" className="w-40">
        {themes.map(({ value, label, icon: Icon }) => {
          const isActive = theme === value

          return (
            <DropdownMenuItem
              key={value}
              onClick={() => setTheme(value)}
              className="cursor-pointer"
            >
              <Icon className="mr-2 size-4" />

              <span className="flex-1">{label}</span>

              {isActive && <Check className="size-4 text-primary" />}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
