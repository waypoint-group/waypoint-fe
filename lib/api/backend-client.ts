import "server-only"

import createClient from "openapi-fetch"

import { BackendAuthError, getSession } from "@/lib/backend"
import type { paths } from "@/lib/api/generated/schema"

// Create per call: access tokens must never be shared between requests.
export const backendClient = async () => {
  const session = await getSession()
  if (session?.error === "RefreshAccessTokenError" || !session?.accessToken) {
    throw new BackendAuthError("Authentication session expired")
  }

  return createClient<paths>({
    baseUrl: process.env.BACKEND_URL,
    headers: { Authorization: `Bearer ${session.accessToken}` },
    cache: "no-store",
  })
}
