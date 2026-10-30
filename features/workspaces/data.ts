import "server-only"

import { cache } from "react"

import { BackendAuthError } from "@/lib/backend"
import { type WorkspaceType } from "@/lib/api/types"
import { backendClient } from "@/lib/api/backend-client"

export type WorkspaceResultType =
  | { status: "unauthenticated" }
  | { status: "notFound" }
  | { status: "ok"; data: WorkspaceType }

export const getWorkspace = cache(
  async (workspaceId: string): Promise<WorkspaceResultType> => {
    try {
      const api = await backendClient()
      const { data: workspace, response } = await api.GET(
        "/workspaces/{workspace_id}",
        {
          params: {
            path: {
              workspace_id: workspaceId,
            },
          },
        }
      )

      if (response.status === 401) {
        return { status: "unauthenticated" }
      }

      // 403 too, so non-members can't probe which workspace ids exist.
      if (response.status === 403 || response.status === 404) {
        return { status: "notFound" }
      }

      if (!response.ok || !workspace) {
        throw new Error(
          `Backend returned ${response.status} or an empty response`
        )
      }

      return { status: "ok", data: workspace }
    } catch (error) {
      if (error instanceof BackendAuthError) {
        return { status: "unauthenticated" }
      }

      throw error
    }
  }
)
