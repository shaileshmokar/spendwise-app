import { NextRequest } from "next/server"

import { apiSuccess } from "@/lib/api-response"
import { requireUser } from "@/lib/auth/require-user"
import { validate } from "@/lib/validate"
import { withErrorHandler } from "@/lib/with-error-handler"

import {
  categoryQuerySchema,
  createCategorySchema,
} from "@/features/categories/category.schema"
import { categoryService } from "@/features/categories/category.service"

export const GET = withErrorHandler(async (request: NextRequest) => {
  const user = await requireUser()

  const searchParams = Object.fromEntries(
    request.nextUrl.searchParams.entries()
  )

  const filters = validate(categoryQuerySchema, searchParams)

  const categories = await categoryService.getCategories(user.id, filters)

  return apiSuccess(categories)
})

export const POST = withErrorHandler(async (request: NextRequest) => {
  const user = await requireUser()

  const body = await request.json()

  const data = validate(createCategorySchema, body)

  const category = await categoryService.createCategory(user.id, data)

  return apiSuccess(category, { status: 201 })
})
