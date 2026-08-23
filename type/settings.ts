export type SettingsSection =
  | "profile"
  | "preferences"
  | "appearance"
  | "notifications"
  | "security"
  | "accounts"
  | "import"
  | "backup"
  | "help"
  | "about"

export type SettingNavItem = {
  id: SettingsSection
  label: string
  icon: React.ElementType
}
