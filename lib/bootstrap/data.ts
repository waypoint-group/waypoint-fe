import "server-only"

import { cache } from "react"

import { BackendAuthError } from "@/lib/backend"
import { type BootstrapType } from "@/lib/api/types"
import { backendClient } from "../api/backend-client"

export type BootstrapResultType =
  | { status: "unauthenticated" }
  | { status: "onboardingRequired" }
  | { status: "ok"; data: BootstrapType }

export const getBootstrap = cache(async (): Promise<BootstrapResultType> => {
  try {
    const api = await backendClient()
    const { data: me, response } = await api.GET("/me")

    if (response.status === 401) {
      return { status: "unauthenticated" }
    }

    if (response.status === 404) {
      return { status: "onboardingRequired" }
    }

    if (!response.ok || !me) {
      throw new Error(
        `Backend returned ${response.status} or an empty response`
      )
    }

    return { status: "ok", data: me }
  } catch (error) {
    if (error instanceof BackendAuthError) {
      return { status: "unauthenticated" }
    }

    throw error
  }
})
