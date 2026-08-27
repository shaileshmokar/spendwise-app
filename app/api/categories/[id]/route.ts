import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const updateCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Category name is required")
    .max(50, "Category name must be 50 characters or less")
    .optional(),

  description: z
    .string()
    .trim()
    .max(255, "Description must be 255 characters or less")
    .optional(),

  type: z.enum(["INCOME", "EXPENSE"]).optional(),

  icon: z
    .string()
    .trim()
    .min(1, "Category icon is required")
    .max(50, "Category icon must be 50 characters or less")
    .optional(),

  color: z
    .string()
    .trim()
    .min(1, "Category color is required")
    .max(50, "Category color must be 50 characters or less")
    .optional(),
})

type RouteContext = {
  params: Promise<{ id: string }>
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    // 1. Check Authentication
    const session = await auth.api.getSession({
      headers: request.headers,
    })

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      )
    }

    // 2. Get category Id
    const { id } = await context.params

    // 3. Find category belonging to a current user
    const category = await prisma.category.findFirst({
      where: {
        userId: session.user.id,
        id: {
          equals: id,
        },
      },
    })

    if (!category) {
      return NextResponse.json(
        {
          success: false,
          message: "Category not found.",
        },
        {
          status: 404,
        }
      )
    }

    // 4. return response
    return NextResponse.json(
      {
        success: true,
        data: category,
      },
      {
        status: 200,
      }
    )
  } catch (error) {
    console.log("Error - GET /api/categories/[id]:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch category",
      },
      {
        status: 500,
      }
    )
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    // 1. Check Authentication
    const session = await auth.api.getSession({
      headers: request.headers,
    })

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      )
    }

    // 2. Get category Id
    const { id } = await context.params

    // 3. Validate request body
    const body = await request.json()

    const result = updateCategorySchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request data",
          errors: result.error.flatten(),
        },
        {
          status: 422,
        }
      )
    }

    // 4. Check category exists and belongs to user
    const existingCategory = await prisma.category.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    })

    if (!existingCategory) {
      return NextResponse.json(
        {
          success: false,
          message: "Category not found",
        },
        {
          status: 404,
        }
      )
    }

    const { name, description, type, icon, color } = result.data

    // 5. Check duplicate name
    if (name) {
      const duplicateCategory = await prisma.category.findFirst({
        where: {
          userId: session.user.id,
          name: {
            equals: name,
            mode: "insensitive",
          },
          type: type ?? existingCategory.type,

          NOT: {
            id,
          },
        },
      })

      if (duplicateCategory) {
        return NextResponse.json(
          {
            success: false,
            message: "Category already exists",
          },
          {
            status: 409,
          }
        )
      }
    }

    // 6. Update category
    const category = await prisma.category.update({
      where: {
        id,
      },
      data: {
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
        ...(type !== undefined && { type }),
        ...(icon !== undefined && { icon }),
        ...(color !== undefined && { color }),
      },
    })

    // 7. Return response
    return NextResponse.json(
      {
        success: false,
        data: category,
      },
      {
        status: 200,
      }
    )
  } catch (error) {
    console.log("Error - PATCH /api/categories/[id]:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update category",
      },
      {
        status: 500,
      }
    )
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    // 1. Check Authentication
    const session = await auth.api.getSession({
      headers: request.headers,
    })

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      )
    }

    // 2. Get Category Id
    const { id } = await context.params

    // 3. Check category belongs to user
    const category = await prisma.category.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    })

    if (!category) {
      return NextResponse.json(
        {
          success: false,
          message: "Category not found",
        },
        { status: 404 }
      )
    }

    // 4. Check if category has transactions
    const transactionCount = await prisma.transaction.count({
      where: {
        categoryId: id,
        userId: session.user.id,
      },
    })

    if (transactionCount > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Cannot delete a category that has transactions",
        },
        {
          status: 409,
        }
      )
    }

    // 5. Delete category
    await prisma.category.delete({
      where: {
        id,
      },
    })

    // 6. return response
    return NextResponse.json({
      success: true,
      data: {
        id,
      },
    })
  } catch (error) {
    console.log("Error - DELETE /api/categories/[id]:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete category",
      },
      {
        status: 500,
      }
    )
  }
}
