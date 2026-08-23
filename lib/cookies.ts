// lib/cookies.ts
import { cookies } from "next/headers"

export async function getSidebarState() {
  try {
    const cookieStore = await cookies()
    const sidebarState = cookieStore.get("sidebar_state")?.value
    return sidebarState !== "false" // default to true if not set
  } catch (error) {
    console.error("Failed to get sidebar state:", error)
    return true // fallback default
  }
}

// You can also add other cookie utilities here
export async function getCookieValue(key: string) {
  const cookieStore = await cookies()
  return cookieStore.get(key)?.value
}

export async function setCookieValue(key: string, value: string) {
  // Note: Setting cookies from server components requires using
  // `next/headers` or Server Actions
}
