import { SettingNavItem } from "@/type/settings"
import { Bell, Info, Palette, User } from "lucide-react"

export const settingsNavigation: SettingNavItem[] = [
  {
    id: "profile",
    label: "Profile",
    icon: User,
  },
  //   {
  //     id: "preferences",
  //     label: "Preferences",
  //     icon: Settings2,
  //   },
  {
    id: "appearance",
    label: "Appearance",
    icon: Palette,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
  },
  //   {
  //     id: "security",
  //     label: "Security",
  //     icon: Shield,
  //   },
  //   {
  //     id: "accounts",
  //     label: "Accounts & Sync",
  //     icon: RefreshCcw,
  //   },
  //   {
  //     id: "import",
  //     label: "Import / Export",
  //     icon: FileUp,
  //   },
  //   {
  //     id: "backup",
  //     label: "Backup",
  //     icon: CloudUpload,
  //   },
  //   {
  //     id: "help",
  //     label: "Help & Support",
  //     icon: CircleHelp,
  //   },
  {
    id: "about",
    label: "About",
    icon: Info,
  },
]
