// lib/toast-utils.ts
import { toast } from "sonner"

export const showErrorToast = (message: string) => {
  toast.error(message, {
    position: "top-right",
    className: "!bg-destructive !text-white border-destructive shadow-lg",
    duration: 4000,
  })
}

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    position: "top-right",
    className: "!bg-green-600 !text-white border-green-700 shadow-lg",
    duration: 3000,
  })
}

export const showInfoToast = (message: string) => {
  toast.info(message, {
    position: "top-right",
    className: "!bg-blue-500 !text-white border-blue-600 shadow-lg",
    duration: 3000,
  })
}

export const showWarningToast = (message: string) => {
  toast.warning(message, {
    position: "top-right",
    className: "!bg-yellow-500 !text-white border-yellow-600 shadow-lg",
    duration: 4000,
  })
}
