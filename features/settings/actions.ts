"use server"

import { BackendAuthError } from "@/lib/backend"
import { logout } from "@/features/auth/actions"
import { backendClient } from "@/lib/api/backend-client"

type DeleteAccountResultType = { status: "error"; message: string }

// Only returns on failure; on success the user is signed out and redirected.
export const deleteAccount = async (
  userId: string
): Promise<DeleteAccountResultType> => {
  try {
    const api = await backendClient()
    const { error, response } = await api.DELETE("/users/{id}", {
      params: {
        path: {
          id: userId,
        },
      },
    })

    if (!response.ok) {
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
      return {
        status: "error",
        message: "Your session expired. Please sign in again.",
      }
    }

    throw error
  }

  // Outside the try, since logout redirects by throwing. Ending the Keycloak session too keeps
  // the next sign-in from silently reusing it.
  return logout()
}
