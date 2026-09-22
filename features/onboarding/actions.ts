"use server"

import { redirect } from "next/navigation"

import { BackendAuthError, backendFetch, getSession } from "@/lib/backend"
import {
  createUserRequestSchema,
  type OnboardingFormValuesType,
} from "@/features/onboarding/schema"

export const createUser = async (values: OnboardingFormValuesType) => {
  const validatedFields = createUserRequestSchema.safeParse(values)

  if (!validatedFields.success) {
    return { message: "Invalid input" }
  }

  try {
    const session = await getSession()

    const response = await backendFetch("/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...validatedFields.data,
        // TODO: drop email once the backend reads it from the access token.
        email: session?.user?.email,
      }),
    })

    if (!response.ok) {
      const data = await response.json().catch(() => null)

      return {
        message: data?.message ?? "Something went wrong. Please try again.",
      }
    }
  } catch (error) {
    if (error instanceof BackendAuthError) {
      return { message: "Your session expired. Please sign in again." }
    }

    throw error
  }

  redirect("/")
}
