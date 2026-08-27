import { NextRequest } from "next/server"

import { apiSuccess } from "@/lib/api-response"
import { requireUser } from "@/lib/auth/require-user"
import { withErrorHandler } from "@/lib/with-error-handler"

import { categoryService } from "@/features/categories/category.service"
import { updateCategorySchema } from "@/features/categories/category.schema"
import { validate } from "@/lib/validate"

type RouteContext = {
  params: Promise<{
    id: string
  }>
}

export const GET = withErrorHandler(
  async (_request: NextRequest, context: RouteContext) => {
    const user = await requireUser()

    const { id } = await context.params

    const category = await categoryService.getCategory(id, user.id)

    return apiSuccess(category)
  }
)

export const PATCH = withErrorHandler(
  async (request: NextRequest, context: RouteContext) => {
    const user = await requireUser()

    const { id } = await context.params

    const body = await request.json()

    const data = validate(updateCategorySchema, body)

    const category = await categoryService.updateCategory(id, user.id, data)

    return apiSuccess(category)
  }
)

export const DELETE = withErrorHandler(
  async (_request: NextRequest, context: RouteContext) => {
    const user = await requireUser()

    const { id } = await context.params

    const result = await categoryService.deleteCategory(id, user.id)

    return apiSuccess(result)
  }
)
