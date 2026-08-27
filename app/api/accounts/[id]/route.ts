import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { success, z } from "zod"

const updateAccountSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Account name is required")
    .max(100, "Account name must be 100 characters or less")
    .optional(),

  type: z
    .enum(["CASH", "BANK", "CREDIT_CARD", "WALLET", "INVESTMENT", "OTHER"])
    .optional(),

  currency: z
    .string()
    .trim()
    .length(3, "Currency must be a 3-letter code")
    .optional(),

  description: z
    .string()
    .trim()
    .max(255, "Description must be 255 characters or less")
    .optional(),

  isActive: z.boolean().optional(),
})

type RouteContext = {
  params: Promise<{ id: string }>
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    // 1. Check authentication
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

    // 2. Get Account Id
    const { id } = await context.params

    // 3. Find account belonging to current user
    const account = await prisma.financialAccount.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    })

    // 4. Account not found
    if (!account) {
      return NextResponse.json(
        {
          success: false,
          message: "Account not found",
        },
        {
          status: 404,
        }
      )
    }

    // 5. Return response
    return NextResponse.json({
      success: true,
      data: account,
    })
  } catch (error) {
    console.error("GET /api/accounts/[id] error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch account",
      },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    // 1. Check authentication
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

    // 2. Get Account Id
    const { id } = await context.params

    // 3. Request Body
    const body = await request.json()

    // 4. Validate request
    const result = updateAccountSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request data",
          error: result.error.flatten(),
        },
        {
          status: 409,
        }
      )
    }

    // 3. Check account belonging to current user
    const existingAccount = await prisma.financialAccount.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    })

    // 4. Account not found
    if (!existingAccount) {
      return NextResponse.json(
        {
          success: false,
          message: "Account not found",
        },
        {
          status: 404,
        }
      )
    }

    const { name, type, currency, description, isActive } = result.data

    // 6. Check Duplicate name
    if (name) {
      const duplicateAccount = await prisma.financialAccount.findFirst({
        where: {
          userId: session.user.id,
          name: {
            equals: name,
            mode: "insensitive",
          },

          NOT: {
            id,
          },
        },
      })

      if (duplicateAccount) {
        return NextResponse.json(
          {
            success: false,
            message: "An account with this name already exists",
          },
          { status: 409 }
        )
      }
    }

    // 7. Update account
    const account = await prisma.financialAccount.update({
      where: {
        id,
      },
      data: {
        ...(name !== undefined && { name }),
        ...(type !== undefined && { type }),
        ...(currency !== undefined && { currency }),
        ...(description !== undefined && { description }),
        ...(isActive !== undefined && { isActive }),
      },
    })

    // 5. Return response
    return NextResponse.json({
      success: true,
      data: account,
    })
  } catch (error) {
    console.error("PATCH /api/accounts/[id] error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update accounts",
      },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    // 1. Check authentication
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

    // 2. Get Account Id
    const { id } = await context.params

    // 3. Check account belonging to current user
    const account = await prisma.financialAccount.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    })

    // 4. Account not found
    if (!account) {
      return NextResponse.json(
        {
          success: false,
          message: "Account not found",
        },
        {
          status: 404,
        }
      )
    }

    //5. check whether account has tranasctions
    const transactionCount = await prisma.transaction.count({
      where: {
        accountId: id,
        userId: session.user.id,
      },
    })

    if (transactionCount > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Cannot delete an account that has transactions",
        },
        {
          status: 404,
        }
      )
    }

    // 6. Delete Account
    await prisma.financialAccount.delete({
      where: {
        id,
      },
    })

    // 5. Return response
    return NextResponse.json({
      success: true,
      data: id,
    })
  } catch (error) {
    console.error("DELETE /api/accounts/[id] error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete accounts",
      },
      { status: 500 }
    )
  }
}
