import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const createTransactionSchema = z.object({
  accountId: z.string().min(1, "Account is required"),

  categoryId: z.string().min(1, "Category is required"),

  type: z.enum(["INCOME", "EXPENSE"]),

  amount: z
    .string()
    .regex(
      /^\d+(\.\d{1,2})?$/,
      "Amount must be a valid positive number with up to 2 decimal places"
    )
    .refine((value) => Number(value) > 0, "Amount must be greater than 0"),

  description: z
    .string()
    .trim()
    .max(500, "Description must be 500 characters or less")
    .optional(),

  merchant: z.string().trim().max(200).optional(),

  transactionDate: z.coerce.date(),

  paymentMethod: z
    .enum([
      "CASH",
      "CREDIT_CARD",
      "DEBIT_CARD",
      "BANK_TRANSFER",
      "UPI",
      "WALLET",
      "OTHER",
    ])
    .optional(),

  notes: z.string().trim().max(1000).optional(),

  location: z.string().trim().max(255).optional(),

  receiptUrl: z.string().url("Invalid receipt URL").optional(),
})

export async function GET(request: NextRequest) {
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

    // 2. Read Query Parameters
    const searchParams = request.nextUrl.searchParams

    const search = searchParams.get("search")
    const type = searchParams.get("type")
    const categoryId = searchParams.get("categoryId")
    const accountId = searchParams.get("accountId")

    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")

    const pageParam = searchParams.get("page") ?? "1"
    const limitParam = searchParams.get("limit") ?? "20"

    const sortOrder = searchParams.get("sortOrder") ?? "asc"

    // 3. Validate type
    if (type !== null && type !== "INCOME" && type !== "EXPENSE") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid transaction type",
        },
        { status: 422 }
      )
    }

    // 4. Validate pagination
    const page = Number(pageParam)
    const limit = Number(limitParam)

    if (!Number.isInteger(page) || page < 1) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid page",
        },
        { status: 422 }
      )
    }

    if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
      return NextResponse.json(
        {
          success: false,
          message: "Limit must be between 1 and 100",
        },
        { status: 422 }
      )
    }

    // 5. Validate Sorting
    if (sortOrder !== "asc" && sortOrder !== "desc") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid sort order",
        },
        { status: 422 }
      )
    }

    // 6. Validate dates
    let parsedStartDate: Date | undefined
    let parsedEndDate: Date | undefined

    if (startDate) {
      parsedStartDate = new Date(startDate)

      if (isNaN(parsedStartDate.getTime())) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid start date",
          },
          { status: 422 }
        )
      }
    }

    if (endDate) {
      parsedEndDate = new Date(endDate)

      if (isNaN(parsedEndDate.getTime())) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid end date",
          },
          { status: 422 }
        )
      }
    }

    // 7. Build date filter
    const dateFilter: {
      gte?: Date
      lte?: Date
    } = {}

    if (parsedStartDate) {
      dateFilter.gte = parsedStartDate
    }

    if (parsedEndDate) {
      dateFilter.lte = parsedEndDate
    }

    // 8. Calculate pagination
    const skip = (page - 1) * limit

    // 9. fetch transaction + total count

    const [transactions, total] = await prisma.$transaction([
      prisma.transaction.findMany({
        where: {
          userId: session.user.id,

          ...(type && {
            type: type as "INCOME" | "EXPENSE",
          }),

          ...(categoryId && {
            categoryId,
          }),

          ...(accountId && {
            accountId,
          }),

          ...(search && {
            OR: [
              {
                description: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                merchant: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            ],
          }),

          ...(Object.keys(dateFilter).length > 0 && {
            transactionDate: dateFilter,
          }),
        },

        include: {
          account: true,
          category: true,
        },

        orderBy: {
          transactionDate: sortOrder as "desc" | "asc",
        },

        skip,
        take: limit,
      }),

      prisma.transaction.count({
        where: {
          userId: session.user.id,

          ...(type && {
            type: type as "INCOME" | "EXPENSE",
          }),

          ...(categoryId && {
            categoryId,
          }),

          ...(accountId && {
            accountId,
          }),

          ...(search && {
            OR: [
              {
                description: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                merchant: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            ],
          }),

          ...(Object.keys(dateFilter).length > 0 && {
            date: dateFilter,
          }),
        },
      }),
    ])

    // 10. return response
    return NextResponse.json({
      success: true,
      data: transactions,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("GET /api/transactions error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch transactions",
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
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

    // 2. Request Body
    const body = await request.json()

    // 3. Validate Request
    const result = await createTransactionSchema.safeParse(body)

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

    const {
      accountId,
      categoryId,
      type,
      amount,
      description,
      merchant,
      transactionDate,
      paymentMethod,
      notes,
      location,
      receiptUrl,
    } = result.data

    // 4. Verify account belongs to user
    const account = await prisma.financialAccount.findFirst({
      where: {
        id: accountId,
        userId: session.user.id,
      },
    })

    if (!account) {
      return NextResponse.json(
        {
          success: false,
          message: "Account not found",
        },
        { status: 404 }
      )
    }

    // 5. Verify category belongs to user
    const category = await prisma.category.findFirst({
      where: {
        id: categoryId,
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

    // 6. Make sure category type matches with transaction type
    if (category.type !== type) {
      return NextResponse.json(
        {
          success: false,
          message: "Category type must match with transaction type",
        },
        { status: 404 }
      )
    }

    // 7. Calculate balance change
    const balanceChange = type === "INCOME" ? amount : `-${amount}`

    // 8. Create Transaction + update account
    const transaction = await prisma.$transaction(async (tx) => {
      const newTransaction = await tx.transaction.create({
        data: {
          userId: session.user.id,
          accountId,
          categoryId,
          type,
          amount,
          description,
          merchant,
          transactionDate,
          paymentMethod,
          notes,
          location,
          receiptUrl,
        },

        include: {
          account: true,
          category: true,
        },
      })

      await tx.financialAccount.update({
        where: {
          id: accountId,
        },
        data: {
          currentBalance: {
            increment: balanceChange,
          },
        },
      })

      return newTransaction
    })

    // 9. Return transaction
    return NextResponse.json(
      {
        success: true,
        data: transaction,
      },
      {
        status: 201,
      }
    )
  } catch (error) {
    console.error("POST /api/transactions error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create transaction",
      },
      { status: 500 }
    )
  }
}
