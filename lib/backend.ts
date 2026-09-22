import "server-only"

import { cache } from "react"

import { auth } from "@/auth"

// Thrown when there is no usable access token, so callers can distinguish it from transport errors.
export class BackendAuthError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "BackendAuthError"
  }
}

// Memoized per request so multiple callers share one JWT decode instead of threading a session around.
export const getSession = cache(() => auth())

export const backendFetch = async (path: string, init?: RequestInit) => {
  const currentSession = await getSession()
  const accessToken = currentSession?.accessToken

  if (currentSession?.error === "RefreshAccessTokenError") {
    throw new BackendAuthError("Authentication session expired")
  }

  if (!accessToken) {
    throw new BackendAuthError("Not authenticated")
  }

  const headers = new Headers(init?.headers)
  headers.set("Authorization", `Bearer ${accessToken}`)

  return fetch(`${process.env.BACKEND_URL}${path}`, {
    ...init,
    headers,
    cache: "no-store",
  })
}
