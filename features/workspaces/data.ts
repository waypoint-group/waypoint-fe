import "server-only"

import { cache } from "react"

import { BackendAuthError, backendFetch } from "@/lib/backend"
import { workspaceSchema, type WorkspaceType } from "@/lib/schemas/workspace"

export type WorkspaceResultType =
  | { status: "unauthenticated" }
  | { status: "notFound" }
  | { status: "ok"; data: WorkspaceType }

export const getWorkspace = cache(
  async (workspaceId: string): Promise<WorkspaceResultType> => {
    let response: Response

    try {
      // Params arrive decoded, so encode to keep the id a single path segment.
      response = await backendFetch(
        `/workspaces/${encodeURIComponent(workspaceId)}`
      )
    } catch (error) {
      if (error instanceof BackendAuthError) {
        return { status: "unauthenticated" }
      }

      throw error
    }

    if (response.status === 401) {
      return { status: "unauthenticated" }
    }

    // 403 too, so non-members can't probe which workspace ids exist.
    if (response.status === 403 || response.status === 404) {
      return { status: "notFound" }
    }

    if (!response.ok) {
      throw new Error(`Backend returned ${response.status}`)
    }

    return { status: "ok", data: workspaceSchema.parse(await response.json()) }
  }
)
