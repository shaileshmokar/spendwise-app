import { apiSuccess } from "@/lib/api-response"
import { requireUser } from "@/lib/auth/require-user"
import { withErrorHandler } from "@/lib/with-error-handler"

export const GET = withErrorHandler(async () => {
  const user = await requireUser()

  return apiSuccess({
    id: user.id,
    name: user.name,
    email: user.email,
  })
})
