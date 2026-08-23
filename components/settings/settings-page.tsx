"use client"

import * as React from "react"
import {
  Bell,
  Check,
  ChevronRight,
  CircleHelp,
  Cloud,
  CloudUpload,
  Copy,
  CreditCard,
  Database,
  Download,
  FileUp,
  Globe,
  Info,
  Laptop,
  Moon,
  Palette,
  RefreshCcw,
  RotateCcw,
  Settings2,
  Shield,
  SlidersHorizontal,
  Sun,
  Trash2,
  User,
  Wallet,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { settingsNavigation } from "@/data/settings"
import { SettingsSection } from "@/type/settings"

function SettingToggle({
  icon: Icon,
  title,
  description,
  checked,
  onCheckedChange,
}: {
  icon: React.ElementType
  title: string
  description: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="size-4 shrink-0 text-muted-foreground" />

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>

      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Main Component                                                             */
/* -------------------------------------------------------------------------- */

export default function SettingsPage() {
  const [activeSection, setActiveSection] =
    React.useState<SettingsSection>("profile")

  const [darkMode, setDarkMode] = React.useState(false)
  const [compactMode, setCompactMode] = React.useState(false)
  const [animations, setAnimations] = React.useState(true)
  const [confirmDelete, setConfirmDelete] = React.useState(true)
  const [autoCategorize, setAutoCategorize] = React.useState(true)
  const [roundAmounts, setRoundAmounts] = React.useState(false)

  const scrollToSection = (section: SettingsSection) => {
    setActiveSection(section)

    const element = document.getElementById(`settings-${section}`)

    element?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  return (
    <div className="grid min-w-0 gap-4 lg:grid-cols-[180px_minmax(0,1fr)_315px]">
      {/* ------------------------------------------------------------------ */}
      {/* Settings Navigation                                                */}
      {/* ------------------------------------------------------------------ */}

      <aside className="rounded-xl border bg-card p-2">
        <nav className="space-y-1">
          {settingsNavigation.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                  isActive
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="size-4 shrink-0" />

                <span className="truncate">{item.label}</span>
              </button>
            )
          })}
        </nav>
      </aside>

      {/* ------------------------------------------------------------------ */}
      {/* Main Settings                                                       */}
      {/* ------------------------------------------------------------------ */}

      <main className="min-w-0 space-y-4">
        {/* Profile Information */}
        <Card id="settings-profile" className="scroll-mt-6">
          <CardHeader>
            <CardTitle className="text-base">Profile Information</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="flex flex-col gap-5 sm:flex-row">
              {/* Avatar */}
              <div className="relative mx-auto sm:mx-0">
                <Avatar className="size-24 border">
                  <AvatarImage src="/avatar.png" alt="Shailesh Mokar" />
                  <AvatarFallback className="text-4xl">SM</AvatarFallback>
                </Avatar>

                {/* <Button
                  size="icon"
                  variant="outline"
                  className="absolute right-0 bottom-0 size-7 rounded-full bg-background"
                >
                  <Copy className="size-3.5" />
                </Button> */}
              </div>

              {/* Profile Fields */}
              <div className="min-w-0 flex-1 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="full-name">Full Name</Label>

                  <Input
                    id="full-name"
                    defaultValue="Shailesh Mokar"
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>

                  <Input
                    id="email"
                    type="email"
                    defaultValue="shailesh@example.com"
                    className="h-10"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number (Optional)</Label>

                  <div className="flex">
                    <Button
                      type="button"
                      variant="outline"
                      className="h-10 rounded-r-none border-r-0 px-3"
                    >
                      🇮🇳
                      <span className="ml-2">+91</span>
                      <ChevronRight className="ml-2 size-3 rotate-90" />
                    </Button>

                    <Input
                      id="phone"
                      defaultValue="98765 43210"
                      className="h-10 rounded-l-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Phone */}
            {/* <div className="space-y-2">
              <Label htmlFor="phone">Phone Number (Optional)</Label>

              <div className="flex">
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-r-none border-r-0 px-3"
                >
                  🇮🇳
                  <span className="ml-2">+91</span>
                  <ChevronRight className="ml-2 size-3 rotate-90" />
                </Button>

                <Input
                  id="phone"
                  defaultValue="98765 43210"
                  className="rounded-l-none"
                />
              </div>
            </div> */}

            <div className="flex justify-end">
              <Button>Save Changes</Button>
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        {/* <Card id="settings-preferences" className="scroll-mt-6">
          <CardHeader>
            <CardTitle className="text-base">Preferences</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <Label>Default Currency</Label>

                <Select defaultValue="inr">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="inr">INR - Indian Rupee (₹)</SelectItem>
                    <SelectItem value="usd">USD - US Dollar ($)</SelectItem>
                    <SelectItem value="eur">EUR - Euro (€)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Date Format</Label>

                <Select defaultValue="dd-mm-yyyy">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="dd-mm-yyyy">DD MMM YYYY</SelectItem>
                    <SelectItem value="mm-dd-yyyy">MM DD YYYY</SelectItem>
                    <SelectItem value="yyyy-mm-dd">YYYY MM DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Start Day of the Week</Label>

                <Select defaultValue="monday">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="monday">Monday</SelectItem>
                    <SelectItem value="sunday">Sunday</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Default Account</Label>

                <Select defaultValue="sbi">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="sbi">SBI Savings Account</SelectItem>
                    <SelectItem value="hdfc">HDFC Bank</SelectItem>
                    <SelectItem value="icici">ICICI Bank</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label>Default Transaction Type</Label>

                <Select defaultValue="expense">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="expense">Expense</SelectItem>
                    <SelectItem value="income">Income</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end">
              <Button>Save Changes</Button>
            </div>
          </CardContent>
        </Card> */}

        {/* Appearance */}
        <Card id="settings-appearance" className="scroll-mt-6">
          <CardHeader>
            <CardTitle className="text-base">Appearance</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-3">
                <Label>Theme</Label>

                <div className="grid grid-cols-3 gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-20 flex-col gap-2 border-primary text-primary"
                  >
                    <Sun className="size-5" />
                    <span className="text-xs">Light</span>
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="h-20 flex-col gap-2"
                  >
                    <Moon className="size-5" />
                    <span className="text-xs">Dark</span>
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="h-20 flex-col gap-2"
                  >
                    <Laptop className="size-5" />
                    <span className="text-xs">System</span>
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Color Accent</Label>

                <div className="flex flex-wrap gap-3">
                  {[
                    "bg-purple-500",
                    "bg-blue-500",
                    "bg-emerald-500",
                    "bg-teal-500",
                    "bg-orange-500",
                    "bg-pink-500",
                  ].map((color, index) => (
                    <button
                      key={color}
                      type="button"
                      className={`flex size-7 items-center justify-center rounded-full ${color}`}
                    >
                      {index === 0 && <Check className="size-4 text-white" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* ------------------------------------------------------------------ */}
      {/* Right Settings                                                      */}
      {/* ------------------------------------------------------------------ */}

      <aside className="min-w-0 space-y-4">
        {/* Quick Settings */}
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-base">Quick Settings</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <SettingToggle
              icon={Moon}
              title="Enable Dark Mode"
              description="Use dark theme across the app"
              checked={darkMode}
              onCheckedChange={setDarkMode}
            />

            <SettingToggle
              icon={SlidersHorizontal}
              title="Compact Mode"
              description="Show more content in less space"
              checked={compactMode}
              onCheckedChange={setCompactMode}
            />

            <SettingToggle
              icon={Palette}
              title="Enable Animations"
              description="Smooth transitions and animations"
              checked={animations}
              onCheckedChange={setAnimations}
            />

            <SettingToggle
              icon={Trash2}
              title="Confirm Before Delete"
              description="Show confirmation before deleting"
              checked={confirmDelete}
              onCheckedChange={setConfirmDelete}
            />

            <SettingToggle
              icon={Wallet}
              title="Auto-categorize Transactions"
              description="Suggest categories for new transactions"
              checked={autoCategorize}
              onCheckedChange={setAutoCategorize}
            />

            <SettingToggle
              icon={RotateCcw}
              title="Round Off Amounts"
              description="Round amounts to nearest rupee"
              checked={roundAmounts}
              onCheckedChange={setRoundAmounts}
            />
          </CardContent>
        </Card>

        {/* Data Management */}
        {/* <Card>
          <CardHeader>
            <CardTitle className="text-base">Data Management</CardTitle>
          </CardHeader>

          <CardContent className="space-y-1">
            <SettingsAction
              icon={Download}
              title="Export All Data"
              description="Download all your data as CSV"
            />

            <SettingsAction
              icon={Database}
              title="Clear Cache"
              description="Free up space and improve performance"
            />

            <SettingsAction
              icon={RotateCcw}
              title="Reset Onboarding"
              description="Show onboarding screens again"
            />
          </CardContent>
        </Card> */}

        {/* Danger Zone */}
        {/* <Card className="border-destructive/20 bg-destructive/[0.02]">
          <CardHeader>
            <CardTitle className="text-base text-destructive">
              Danger Zone
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <Trash2 className="mt-0.5 size-5 shrink-0 text-destructive" />

              <div>
                <p className="text-sm font-medium text-destructive">
                  Delete Account
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Permanently delete your account and all data. This action
                  cannot be undone.
                </p>
              </div>
            </div>

            <Button variant="destructive" className="gap-2">
              <Trash2 className="size-4" />
              Delete Account
            </Button>
          </CardContent>
        </Card> */}
      </aside>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Settings Action                                                            */
/* -------------------------------------------------------------------------- */

function SettingsAction({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType
  title: string
  description: string
}) {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors hover:bg-muted"
    >
      <Icon className="size-5 shrink-0 text-muted-foreground" />

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>

      <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
    </button>
  )
}
