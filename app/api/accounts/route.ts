import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const createAccountsSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Account name is required")
    .max(100, "Account name must be 100 characters or less"),

  type: z.enum([
    "CASH",
    "BANK",
    "CREDIT_CARD",
    "WALLET",
    "INVESTMENT",
    "OTHER",
  ]),

  balance: z
    .string()
    .regex(/^-?\d+(\.\d{1,2})?$/, "Invalid balance")
    .default("0"),

  currency: z.string().trim().length(3, "Currency must be a 3-letter code"),

  description: z
    .string()
    .trim()
    .max(255, "Description must be 255 characters or less")
    .optional(),

  isActive: z.boolean().default(true),
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
          success: true,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      )
    }

    // 2. Get searchparams
    const searchParams = request.nextUrl.searchParams
    const search = searchParams.get("search")
    const type = searchParams.get("type")
    const isActive = searchParams.get("isActive")

    // 3. Validate account type
    const validTypes = [
      "CASH",
      "BANK",
      "CREDIT_CARD",
      "WALLET",
      "INVESTMENT",
      "OTHER",
    ]

    if (type !== null && !validTypes.includes(type)) {
      return NextResponse.json(
        {
          success: true,
          message: "Invalid Account Type",
        },
        {
          status: 422,
        }
      )
    }

    // 4. Validate isActive
    if (isActive !== null && isActive !== "true" && isActive !== "false") {
      return NextResponse.json(
        {
          success: true,
          method: "Invalid isActive value",
        },
        {
          status: 422,
        }
      )
    }

    // 5. Get Accounts
    const accounts = await prisma.financialAccount.findMany({
      where: {
        userId: session.user.id,

        ...(search && {
          name: {
            contains: search,
            mode: "insensitive",
          },
        }),

        ...(type && {
          type: type as
            "CASH" | "BANK" | "CREDIT_CARD" | "WALLET" | "INVESTMENT" | "OTHER",
        }),

        ...(isActive !== null && {
          isActive: isActive === "true",
        }),
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json({
      success: true,
      data: accounts,
    })
  } catch (error) {
    console.log("ERROR - GET /api/accounts - ", error)

    return NextResponse.json(
      {
        success: true,
        message: "Failed to fetch accounts",
      },
      {
        status: 500,
      }
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

    // 2. Get request body
    const body = await request.json()

    // 3. Validate request
    const result = createAccountsSchema.safeParse(body)

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

    const { name, type, balance, currency, isActive } = result.data

    // 4. Check duplicate Account
    const existingCategory = await prisma.financialAccount.findFirst({
      where: {
        userId: session.user.id,
        name: {
          equals: name,
          mode: "insensitive",
        },
      },
    })

    if (existingCategory) {
      return NextResponse.json(
        {
          success: false,
          message: "An Account with this name already exists",
        },
        {
          status: 409,
        }
      )
    }

    // 5. Create Account
    const account = await prisma.financialAccount.create({
      data: {
        name,
        currency,
        balance,
        type,
        isActive,
        userId: session.user.id,
      },
    })

    // 6. Return response
    return NextResponse.json(
      {
        success: true,
        data: account,
      },
      {
        status: 201,
      }
    )
  } catch (error) {
    console.error("POST /api/accounts error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create accounts",
      },
      { status: 500 }
    )
  }
}
