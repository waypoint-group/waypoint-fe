"use server"

import { BackendAuthError, backendFetch } from "@/lib/backend"
import { logout } from "@/features/auth/actions"

type DeleteAccountResultType = { status: "error"; message: string }

// Only returns on failure; on success the user is signed out and redirected.
export const deleteAccount = async (
  userId: string
): Promise<DeleteAccountResultType> => {
  try {
    // Encode so the client-supplied id stays a single path segment.
    const response = await backendFetch(
      `/users/${encodeURIComponent(userId)}`,
      { method: "DELETE" }
    )

    if (!response.ok) {
      const data = await response.json().catch(() => null)

      return {
        status: "error",
        message: data?.message ?? "Something went wrong. Please try again.",
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
