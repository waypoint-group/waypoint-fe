import { NextResponse } from "next/server"
import { backendFetch, BackendAuthError } from "@/lib/backend"
import { meResponseSchema } from "@/lib/validations/me"

export const GET = async () => {
  try {
    const response = await backendFetch("/me")

    if (!response.ok) {
      return NextResponse.json(
        { message: response.statusText },
        { status: response.status }
      )
    }

    const validatedResponse = meResponseSchema.safeParse(await response.json())

    if (!validatedResponse.success) {
      return NextResponse.json(
        { message: "Unexpected response from backend" },
        { status: 502 }
      )
    }

    return NextResponse.json(validatedResponse.data)
  } catch (error) {
    if (error instanceof BackendAuthError) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    throw error
  }
}
