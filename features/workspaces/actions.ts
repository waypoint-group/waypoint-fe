"use server"

import { revalidatePath } from "next/cache"

import { BackendAuthError, backendFetch } from "@/lib/backend"
import { workspacePreviewSchema } from "@/lib/schemas/workspace"
import {
  addWorkspaceMemberRequestSchema,
  createWorkspaceSchema,
  type AddWorkspaceMemberFormValuesType,
  type CreateWorkspaceFormValuesType,
} from "@/features/workspaces/schema"

type CreateWorkspaceResultType =
  { status: "ok"; workspaceId: string } | { status: "error"; message: string }

export const createWorkspace = async (
  values: CreateWorkspaceFormValuesType
): Promise<CreateWorkspaceResultType> => {
  const validatedFields = createWorkspaceSchema.safeParse(values)

  if (!validatedFields.success) {
    return { status: "error", message: "Invalid input" }
  }

  try {
    const response = await backendFetch("/workspaces", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedFields.data),
    })

    if (!response.ok) {
      const data = await response.json().catch(() => null)

      return {
        status: "error",
        message: data?.message ?? "Something went wrong. Please try again.",
      }
    }

    const workspace = workspacePreviewSchema.parse(await response.json())

    // The workspace rail is rendered from bootstrap data in the (app) layout.
    revalidatePath("/", "layout")

    return { status: "ok", workspaceId: workspace.id }
  } catch (error) {
    if (error instanceof BackendAuthError) {
      return {
        status: "error",
        message: "Your session expired. Please sign in again.",
      }
    }

    throw error
  }
}

type AddWorkspaceMemberResultType =
  { status: "ok" } | { status: "error"; message: string }

export const addWorkspaceMember = async (
  workspaceId: string,
  values: AddWorkspaceMemberFormValuesType
): Promise<AddWorkspaceMemberResultType> => {
  const validatedFields = addWorkspaceMemberRequestSchema.safeParse(values)

  if (!validatedFields.success) {
    return { status: "error", message: "Invalid input" }
  }

  try {
    // Encode so the client-supplied id stays a single path segment.
    const response = await backendFetch(
      `/workspaces/${encodeURIComponent(workspaceId)}/members`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedFields.data),
      }
    )

    if (!response.ok) {
      const data = await response.json().catch(() => null)

      return {
        status: "error",
        message: data?.message ?? "Something went wrong. Please try again.",
      }
    }

    // Members come from getWorkspace in the workspace layout.
    revalidatePath(`/workspaces/${workspaceId}`, "layout")

    return { status: "ok" }
  } catch (error) {
    if (error instanceof BackendAuthError) {
      return {
        status: "error",
        message: "Your session expired. Please sign in again.",
      }
    }

    throw error
  }
}
