import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

type RouteContext = {
  params: Promise<{
    id: string
  }>
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

    // 2. Get Transaction Id
    const { id } = await context.params

    // 3. check Transaction exist for current user
    const transaction = await prisma.transaction.findFirst({
      where: {
        id,
        userId: session.user.id,
      },

      include: {
        category: true,
        account: true,
      },
    })

    if (!transaction) {
      return NextResponse.json(
        {
          success: false,
          message: "Transaction not found",
        },
        {
          status: 404,
        }
      )
    }

    return NextResponse.json({
      success: true,
      data: transaction,
    })
  } catch (error) {
    console.error("GET /api/transactions/[id] error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch transaction",
      },
      { status: 500 }
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

    // 2. Get Transaction Id
    const { id } = await context.params

    // 3. Find Transaction
    const transaction = await prisma.transaction.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    })

    if (!transaction) {
      return NextResponse.json(
        {
          success: false,
          message: "Transaction not found",
        },
        {
          status: 404,
        }
      )
    }

    // 4. calculate reverse balance effect
    const balanceChange =
      transaction.type === "INCOME"
        ? transaction.amount.negated()
        : transaction.amount

    // 5. Delete transaction + restore balance
    await prisma.$transaction(async (tx) => {
      await tx.transaction.delete({
        where: {
          id,
        },
      })

      await tx.financialAccount.update({
        where: {
          id: transaction.accountId,
        },
        data: {
          currentBalance: {
            increment: balanceChange,
          },
        },
      })
    })

    return NextResponse.json({
      success: true,
      data: {
        id,
      },
    })
  } catch (error) {
    console.error("Error: DELETE /api/transactions/[id]: ", error)

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete transaction.",
      },
      {
        status: 500,
      }
    )
  }
}
