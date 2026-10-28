import "server-only"

import { cache } from "react"

import { BackendAuthError } from "@/lib/backend"
import { type BootstrapType } from "@/lib/bootstrap/schema"
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

    return {
      status: "ok",
      data: {
        user: {
          id: me.user.id,
          email: me.user.email,
          username: me.user.user_name,
          displayName: me.user.display_name,
          createdAt: new Date(me.user.created_at),
        },
        workspaceMemberships: me.workspace_memberships.map((membership) => ({
          id: membership.workspace_id,
          name: membership.workspace_name,
        })),
      },
    }
  } catch (error) {
    if (error instanceof BackendAuthError) {
      return { status: "unauthenticated" }
    }

    throw error
  }
})
