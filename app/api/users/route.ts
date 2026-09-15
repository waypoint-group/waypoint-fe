import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { backendFetch, BackendAuthError } from "@/lib/backend"
import { createUserRequestSchema } from "@/lib/validations/onboarding"

export const POST = async (request: Request) => {
  const body = await request.json()
  const validatedFields = createUserRequestSchema.safeParse(body)

  if (!validatedFields.success) {
    return NextResponse.json({ message: "Invalid input" }, { status: 400 })
  }

  try {
    const session = await auth()

    const response = await backendFetch(
      "/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...validatedFields.data,
          // TODO: drop email once the backend reads it from the access token.
          email: session?.user?.email,
        }),
      },
      session ?? undefined
    )

    const data = await response.json()

    return NextResponse.json(data, {
      status: response.status,
    })
  } catch (error) {
    if (error instanceof BackendAuthError) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    throw error
  }
}
