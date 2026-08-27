import { ApiError } from "@/lib/api-error"
import { withErrorHandler } from "@/lib/with-error-handler"

export const GET = withErrorHandler(async () => {
  throw new ApiError(404, "CATEGORY_NOT_FOUND", "Category was not found")
})
