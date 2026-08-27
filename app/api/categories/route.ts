import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const createCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Category name is required")
    .max(50, "Category name must be 50 characters or less"),

  description: z
    .string()
    .trim()
    .max(255, "Category description must be 255 characters or less")
    .optional(),

  type: z.enum(["INCOME", "EXPENSE"]),

  icon: z
    .string()
    .trim()
    .min(1, "Category icon is required")
    .max(50, "Category icon must be 50 characters or less"),

  color: z
    .string()
    .trim()
    .min(1, "Category color is required")
    .max(50, "Category color must be 50 characters or less"),
})

export async function GET(request: NextRequest) {
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
        { status: 401 }
      )
    }

    // 2. Query Params
    const searchParams = request.nextUrl.searchParams
    const search = searchParams.get("search")
    const type = searchParams.get("search")

    // 3. Validate category type
    if (type !== null && type !== "INCOME" && type !== "EXPENSE") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Category type",
        },
        { status: 422 }
      )
    }

    // 4. Build Query
    const categories = await prisma.category.findMany({
      where: {
        userId: session.user.id,

        ...(type && {
          type: type as "INCOME" | "EXPENSE",
        }),

        ...(search && {
          name: {
            contains: search,
            mode: "insensitive",
          },
        }),
      },
      orderBy: {
        name: "asc",
      },
    })

    return NextResponse.json(
      {
        success: true,
        data: categories,
      },
      { status: 200 }
    )
  } catch (error) {
    console.log("Error - GET /api/categories : ", error)

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch categories",
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
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
          status: 404,
        }
      )
    }

    // 2. Request body
    const body = await request.json()

    // 3. Validate Request data
    const result = createCategorySchema.safeParse(body)

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

    const { name, description, type, icon, color } = result.data

    // 4. Check Duplicate Category
    const existingCategory = await prisma.category.findFirst({
      where: {
        userId: session.user.id,
        name: {
          equals: name,
          mode: "insensitive",
        },
        type,
      },
    })

    if (existingCategory) {
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

    // 5. Create category
    const category = await prisma.category.create({
      data: {
        name,
        description,
        type,
        icon,
        color,
        userId: session.user.id,
      },
    })

    // 6. Return Response
    return NextResponse.json(
      {
        success: true,
        data: category,
      },
      {
        status: 201,
      }
    )
  } catch (error) {
    console.log("ERROR - POST /api/categories", error)

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create category",
      },
      {
        status: 500,
      }
    )
  }
}
