import { apiSuccess } from "@/lib/api-response"

export async function GET() {
  return apiSuccess(
    {
      id: "test",
      name: "SpendWise",
    },
    {
      message: "API response is working",
    }
  )
}
