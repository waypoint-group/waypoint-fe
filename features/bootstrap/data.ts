import "server-only"

import { cache } from "react"

import { BackendAuthError, backendFetch } from "@/lib/backend"
import {
  bootstrapSchema,
  type BootstrapType,
} from "@/features/bootstrap/schema"

export type BootstrapResultType =
  | { status: "unauthenticated" }
  | { status: "onboardingRequired" }
  | { status: "ok"; data: BootstrapType }

export const getBootstrap = cache(async (): Promise<BootstrapResultType> => {
  let response: Response

  try {
    response = await backendFetch("/me")
  } catch (error) {
    if (error instanceof BackendAuthError) {
      return { status: "unauthenticated" }
    }

    throw error
  }

  if (response.status === 401) {
    return { status: "unauthenticated" }
  }

  if (response.status === 404) {
    return { status: "onboardingRequired" }
  }

  if (!response.ok) {
    throw new Error(`Backend returned ${response.status}`)
  }

  return { status: "ok", data: bootstrapSchema.parse(await response.json()) }
})
