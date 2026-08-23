"use client"

import * as React from "react"
import { X, Check, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "../ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Field, FieldDescription, FieldLabel } from "../ui/field"
import { CategoryType } from "@/type/categories"
import { categoryColors, categoryIcons } from "@/data/categories"

export type AddAccountDialogProps = {
  onSave?: (category: {
    type: CategoryType
    name: string
    description: string
    icon: string
    color: string
  }) => void
}

export function AddAccountDialog({ onSave }: AddAccountDialogProps) {
  const [type, setType] = React.useState<CategoryType>("expense")
  const [name, setName] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [selectedIcon, setSelectedIcon] = React.useState("utensils")
  const [selectedColor, setSelectedColor] = React.useState("blue")
  const [error, setError] = React.useState("")

  const resetForm = () => {
    setType("expense")
    setName("")
    setDescription("")
    setSelectedIcon("utensils")
    setSelectedColor("blue")
    setError("")
  }

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      resetForm()
    }
  }

  const handleSave = () => {
    const trimmedName = name.trim()

    if (!trimmedName) {
      setError("Category name is required.")
      return
    }

    setError("")

    const category = {
      type,
      name: trimmedName,
      description: description.trim(),
      icon: selectedIcon,
      color: selectedColor,
    }

    console.log("New category:", category)

    onSave?.(category)

    handleOpenChange(false)
  }

  const selectedColorData = categoryColors.find(
    (color) => color.name === selectedColor
  )

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button className="h-10 shrink-0 gap-2 px-3 sm:px-4">
            <Plus className="size-4" />
            <span className="hidden sm:inline">Add Account</span>
          </Button>
        }
      />
      <DialogContent className="px-4 sm:max-w-2xl" showCloseButton={false}>
        {/* Header */}
        <DialogHeader className="relative">
          <DialogTitle className="text-xl font-bold">Add Account</DialogTitle>

          <DialogDescription>
            Create a new account to organize your transactions.
          </DialogDescription>

          {/* Close */}
          <DialogClose
            render={
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute -top-1 -right-1 size-8"
              >
                <X className="size-5" />
                <span className="sr-only">Close</span>
              </Button>
            }
          />
        </DialogHeader>
        <Separator />

        <div className="max-h-[80vh] space-y-5 overflow-y-auto">
          {/* Type */}
          <div className="space-y-2">
            <Label>Type</Label>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setType("expense")}
                className={`flex h-10 items-center justify-center gap-2 rounded-md border text-sm font-medium transition-colors ${
                  type === "expense"
                    ? "border-red-200 bg-red-50 text-red-500"
                    : "border-border bg-background text-muted-foreground hover:bg-muted"
                }`}
              >
                <span className="text-base">↓</span>
                Expense
              </button>

              <button
                type="button"
                onClick={() => setType("income")}
                className={`flex h-10 items-center justify-center gap-2 rounded-md border text-sm font-medium transition-colors ${
                  type === "income"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                    : "border-border bg-background text-muted-foreground hover:bg-muted"
                }`}
              >
                <span className="text-base">↑</span>
                Income
              </button>
            </div>
          </div>

          {/* Category Name */}
          <Field>
            <FieldLabel htmlFor="category-name">
              Category Name <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              id="category-name"
              value={name}
              onChange={(event) => {
                setName(event.target.value)
                setError("")
              }}
              placeholder="e.g. Food & Dining"
              className={error ? "border-destructive" : ""}
            />
            {error && (
              <FieldDescription className="text-xs text-destructive">
                {error}
              </FieldDescription>
            )}
          </Field>

          {/* Category Description */}
          <Field>
            <FieldLabel htmlFor="category-description">
              Description{" "}
              <span className="text-muted-foreground">(Optional)</span>
            </FieldLabel>
            <div className="relative">
              <Textarea
                id="category-description"
                value={description}
                maxLength={100}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Add a short description..."
                className="min-h-24 resize-none pb-7"
              />
              <span className="absolute right-3 bottom-2 text-xs text-muted-foreground">
                {description.length}/100
              </span>
            </div>
          </Field>

          {/* Icon */}
          <div className="space-y-2">
            <Label>Icon</Label>

            <div className="grid grid-cols-6 gap-2 sm:grid-cols-10">
              {categoryIcons.map(({ name: iconName, icon: Icon }) => {
                const selected = selectedIcon === iconName

                return (
                  <Tooltip key={iconName}>
                    <TooltipTrigger
                      render={
                        <button
                          key={iconName}
                          type="button"
                          onClick={() => setSelectedIcon(iconName)}
                          aria-label={`Select ${iconName} icon`}
                          title={iconName}
                          className={`flex size-10 items-center justify-center rounded-lg border transition-all ${
                            selected
                              ? `border-${selectedColor} ${selectedColorData?.className} text-white ring-1 ring-${selectedColor}`
                              : "border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                          }`}
                        >
                          <Icon className="size-5" />
                        </button>
                      }
                    />

                    <TooltipContent>
                      {iconName
                        .split("-")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </TooltipContent>
                  </Tooltip>
                )
              })}

              {/* More */}
              {/* <Tooltip key="icon-more">
                <TooltipTrigger
                  render={
                    <button
                      type="button"
                      className="flex size-10 items-center justify-center rounded-lg border text-muted-foreground hover:bg-muted"
                    >
                      <MoreHorizontal className="size-5" />
                    </button>
                  }
                />
                <TooltipContent>More</TooltipContent>
              </Tooltip> */}
            </div>
          </div>

          {/* Color */}
          <div className="space-y-2">
            <Label>Color</Label>

            <div className="flex items-center gap-4">
              {categoryColors.map((color) => {
                const selected = selectedColor === color.name

                return (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => setSelectedColor(color.name)}
                    aria-label={`Select ${color.name} color`}
                    className={`relative flex size-6 items-center justify-center rounded-full ${color.className} ${
                      selected ? "ring-2 ring-background ring-offset-2" : ""
                    }`}
                  >
                    {selected && (
                      <Check className="size-3 text-white" strokeWidth={3} />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <Separator />
        {/* Actions */}
        <div className="flex justify-end gap-2">
          <DialogClose
            render={
              <Button type="button" size="lg" variant="outline">
                Cancel
              </Button>
            }
          />

          <Button
            type="button"
            size="lg"
            onClick={handleSave}
            className="gap-2 bg-emerald-600 hover:bg-emerald-700"
          >
            <Check className="size-4" />
            Save Category
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
