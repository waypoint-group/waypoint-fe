import "client-only"

import type { z } from "zod"

import { ApiError } from "@/lib/api/error"

// Relative URL: client-side reads/writes go through the BFF proxy rather than straight to BACKEND_URL.
export const apiFetch = async <TSchema extends z.ZodType>(
  path: string,
  schema: TSchema,
  init?: RequestInit
): Promise<z.output<TSchema>> => {
  const headers = new Headers(init?.headers)

  if (init?.body && !headers.has("content-type")) {
    headers.set("content-type", "application/json")
  }

  const response = await fetch(`/api/backend${path}`, { ...init, headers })

  if (!response.ok) {
    const body = await response.json().catch(() => null)

    throw new ApiError(response.status, body?.message ?? response.statusText)
  }

  return schema.parse(await response.json())
}
