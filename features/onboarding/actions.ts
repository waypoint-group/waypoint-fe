"use server"

import { redirect } from "next/navigation"

import { BackendAuthError } from "@/lib/backend"
import {
  createUserRequestSchema,
  type OnboardingFormValuesType,
} from "@/features/onboarding/schema"
import { backendClient } from "@/lib/api/backend-client"

export const createUser = async (values: OnboardingFormValuesType) => {
  const validatedFields = createUserRequestSchema.safeParse(values)

  if (!validatedFields.success) {
    return { message: "Invalid input" }
  }

  try {
    const api = await backendClient()
    const {
      data: user,
      error,
      response,
    } = await api.POST("/users", {
      body: validatedFields.data,
    })

    if (!response.ok || !user) {
      return {
        status: "error",
        message:
          response.status === 401
            ? "Your session expired. Please sign in again."
            : error?.trim() || "Something went wrong. Please try again.",
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
