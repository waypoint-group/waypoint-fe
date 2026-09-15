import { auth } from "@/auth"
import type { Session } from "next-auth"

// Thrown when there is no usable access token, so callers can distinguish it from transport errors.
export class BackendAuthError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "BackendAuthError"
  }
}

export const backendFetch = async (
  path: string,
  init?: RequestInit,
  session?: Session
) => {
  const currentSession = session ?? (await auth())
  const accessToken = currentSession?.accessToken

  if (currentSession?.error === "RefreshAccessTokenError") {
    throw new BackendAuthError("Authentication session expired")
  }

  if (!accessToken) {
    throw new BackendAuthError("Not authenticated")
  }

  return fetch(`${process.env.BACKEND_URL}${path}`, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  })
}
