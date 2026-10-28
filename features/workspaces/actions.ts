"use server"

import { revalidatePath } from "next/cache"

import { BackendAuthError } from "@/lib/backend"
import { backendClient } from "@/lib/api/backend-client"
import {
  createWorkspaceSchema,
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
    const api = await backendClient()
    const {
      data: workspace,
      error,
      response,
    } = await api.POST("/workspaces", {
      body: validatedFields.data,
    })

    if (!response.ok || !workspace) {
      return {
        status: "error",
        message:
          response.status === 401
            ? "Your session expired. Please sign in again."
            : error?.trim() || "Something went wrong. Please try again.",
      }
    }

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
  userId: string
): Promise<AddWorkspaceMemberResultType> => {
  try {
    const api = await backendClient()
    const {
      data: member,
      error,
      response,
    } = await api.POST("/workspaces/{workspace_id}/users/{user_id}", {
      params: {
        path: {
          workspace_id: workspaceId,
          user_id: userId,
        },
      },
    })

    if (!response.ok || !member) {
      return {
        status: "error",
        message:
          response.status === 401
            ? "Your session expired. Please sign in again."
            : error?.trim() || "Something went wrong. Please try again.",
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

type DeleteWorkspaceResultType =
  { status: "ok" } | { status: "error"; message: string }

export const deleteWorkspace = async (
  workspaceId: string
): Promise<DeleteWorkspaceResultType> => {
  try {
    const api = await backendClient()
    const { error, response } = await api.DELETE("/workspaces/{workspace_id}", {
      params: {
        path: {
          workspace_id: workspaceId,
        },
      },
    })

    if (!response.ok) {
      return {
        status: "error",
        message:
          response.status === 401
            ? "Your session expired. Please sign in again."
            : error?.trim() || "Something went wrong. Please try again.",
      }
    }

    // The workspace rail is rendered from bootstrap data in the (app) layout.
    revalidatePath("/", "layout")

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
