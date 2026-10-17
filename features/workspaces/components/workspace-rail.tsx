"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { AddUserToWorkspaceDialog } from "@/features/workspaces/components/add-user-to-workspace-dialog"
import { CreateWorkspaceDialog } from "@/features/workspaces/components/create-workspace-dialog"
import { DeleteWorkspaceDialog } from "@/features/workspaces/components/delete-workspace-dialog"
import { useBootstrap } from "@/lib/bootstrap/context"
import type { WorkspacePreviewType } from "@/lib/schemas/workspace"

const railItemClassName =
  "flex size-11 shrink-0 items-center justify-center rounded-2xl bg-background text-sm font-semibold transition-all hover:bg-primary hover:text-primary-foreground aria-[current=page]:rounded-xl aria-[current=page]:bg-primary aria-[current=page]:text-primary-foreground"

const WorkspaceRailItem = ({
  workspace,
  isActive,
}: {
  workspace: WorkspacePreviewType
  isActive: boolean
}) => {
  // Dialogs live outside the menu popup, which unmounts as soon as an item is clicked.
  const [isInviteOpen, setIsInviteOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  return (
    <>
      <ContextMenu>
        <Tooltip>
          <TooltipTrigger
            render={
              <ContextMenuTrigger
                render={
                  <Link
                    href={`/workspaces/${workspace.id}`}
                    aria-label={workspace.name}
                    aria-current={isActive ? "page" : undefined}
                    className={railItemClassName}
                  />
                }
              />
            }
          >
            {workspace.name.charAt(0).toUpperCase()}
          </TooltipTrigger>

          <TooltipContent side="right">{workspace.name}</TooltipContent>
        </Tooltip>

        <ContextMenuContent className="min-w-48">
          <ContextMenuItem onClick={() => setIsInviteOpen(true)}>
            Invite to Workspace
          </ContextMenuItem>
          {/* TODO: Show only if the user is the owner of this workspace. */}
          <ContextMenuItem>Workspace Settings</ContextMenuItem>
          {/* TODO: Show only if the user is the owner of this workspace. */}
          <ContextMenuItem>Create Channel</ContextMenuItem>

          <ContextMenuSeparator />

          {/* TODO: Show only if the user is NOT the owner of this workspace. */}
          <ContextMenuItem variant="destructive">
            Leave Workspace
          </ContextMenuItem>
          {/* TODO: Show only if the user is the owner of this workspace. */}
          <ContextMenuItem
            variant="destructive"
            onClick={() => setIsDeleteOpen(true)}
          >
            Delete Workspace
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <AddUserToWorkspaceDialog
        workspaceId={workspace.id}
        workspaceName={workspace.name}
        open={isInviteOpen}
        onOpenChange={setIsInviteOpen}
      />

      <DeleteWorkspaceDialog
        workspaceId={workspace.id}
        isActive={isActive}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
      />
    </>
  )
}

export const WorkspaceRail = () => {
  const { workspaceMemberships: workspaces } = useBootstrap()
  const pathname = usePathname()
  const isWorkspaceRoute = pathname.startsWith("/workspaces/")

  const isWorkspaceActive = (workspaceId: string) => {
    const href = `/workspaces/${workspaceId}`

    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <nav className="flex w-16 shrink-0 flex-col items-center gap-2 overflow-y-auto border-r bg-muted/40 py-3">
      <Link
        href="/dms"
        aria-current={isWorkspaceRoute ? undefined : "page"}
        className={railItemClassName}
      >
        DM
      </Link>

      <Separator className="w-8!" />

      {workspaces.map((workspace) => (
        <WorkspaceRailItem
          key={workspace.id}
          workspace={workspace}
          isActive={isWorkspaceActive(workspace.id)}
        />
      ))}

      <CreateWorkspaceDialog />
    </nav>
  )
}
