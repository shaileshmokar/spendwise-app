// import { betterAuth } from "better-auth"
// import { prismaAdapter } from "better-auth/adapters/prisma"
// import { PrismaClient } from "./generated/prisma/client"
// import { PrismaPg } from "@prisma/adapter-pg"

// const adapter = new PrismaPg({
//   connectionString: process.env.DATABASE_URL,
// })

// const prisma = new PrismaClient({
//   adapter,
// })

// export const auth = betterAuth({
//   database: prismaAdapter(prisma, {
//     provider: "postgresql",
//   }),
//   emailAndPassword: {
//     enabled: true,
//   },
//   socialProviders: {
//     github: {
//       clientId: "",
//       clientSecret: "",
//     },
//     google: {
//       clientId: "",
//       clientSecret: "",
//     },
//   },
// })

import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"

import { prisma } from "@/lib/prisma"
// import prisma

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
  trustedOrigins: ["http://localhost:3000"],
})
