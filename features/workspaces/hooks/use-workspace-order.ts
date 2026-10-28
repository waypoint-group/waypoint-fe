"use client"

import { useMemo } from "react"

import { usePreference } from "@/lib/preferences/context"
import type { WorkspacePreviewType } from "@/lib/schemas/workspace"

export const useWorkspaceOrder = (workspaces: WorkspacePreviewType[]) => {
  const [workspaceOrder, setWorkspaceOrder] = usePreference("workspaceOrder")

  const orderedWorkspaces = useMemo(() => {
    const order = workspaceOrder ?? []
    const rank = new Map(order.map((id, index) => [id, index]))

    // Workspaces missing from the saved order (e.g. just created or joined) keep their backend order at the end.
    return [...workspaces].sort(
      (a, b) =>
        (rank.get(a.id) ?? order.length) - (rank.get(b.id) ?? order.length)
    )
  }, [workspaceOrder, workspaces])

  return { orderedWorkspaces, saveOrder: setWorkspaceOrder }
}
