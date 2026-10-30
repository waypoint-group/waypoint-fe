"use client"

import { RestrictToVerticalAxis } from "@dnd-kit/abstract/modifiers"
import { KeyboardSensor } from "@dnd-kit/dom"
import { RestrictToElement } from "@dnd-kit/dom/modifiers"
import { move } from "@dnd-kit/helpers"
import { DragDropProvider } from "@dnd-kit/react"
import { useSortable } from "@dnd-kit/react/sortable"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRef, useState } from "react"

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
import { useWorkspaceOrder } from "@/features/workspaces/hooks/use-workspace-order"
import { useBootstrap } from "@/lib/bootstrap/context"
import type { WorkspaceMembershipType } from "@/lib/api/types"

const railItemClassName =
  "flex size-11 shrink-0 items-center justify-center rounded-2xl bg-background text-sm font-semibold transition-all hover:bg-primary hover:text-primary-foreground aria-[current=page]:rounded-xl aria-[current=page]:bg-primary aria-[current=page]:text-primary-foreground data-dragging:rounded-xl data-dragging:shadow-lg"

// Enter is left out of the start keys so it still follows the link; Space picks an item up instead.
const sensors = [
  KeyboardSensor.configure({
    keyboardCodes: {
      ...KeyboardSensor.defaults.keyboardCodes,
      start: ["Space"],
    },
  }),
]

const WorkspaceRailItem = ({
  workspace,
  index,
  isActive,
  isSorting,
}: {
  workspace: WorkspaceMembershipType
  index: number
  isActive: boolean
  isSorting: boolean
}) => {
  // Dialogs live outside the menu popup, which unmounts as soon as an item is clicked.
  const [isInviteOpen, setIsInviteOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const { ref, isDragging } = useSortable({ id: workspace.workspace_id, index })

  return (
    <>
      <ContextMenu>
        {/* Tooltips would trail every item the pointer passes over mid-drag. */}
        <Tooltip disabled={isSorting}>
          <TooltipTrigger
            ref={ref}
            data-dragging={isDragging || undefined}
            render={
              <ContextMenuTrigger
                render={
                  <Link
                    href={`/workspaces/${workspace.workspace_id}`}
                    aria-label={workspace.workspace_name}
                    aria-current={isActive ? "page" : undefined}
                    className={railItemClassName}
                  />
                }
              />
            }
          >
            {workspace.workspace_name.charAt(0).toUpperCase()}
          </TooltipTrigger>

          <TooltipContent side="right">
            {workspace.workspace_name}
          </TooltipContent>
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
        workspaceId={workspace.workspace_id}
        workspaceName={workspace.workspace_name}
        open={isInviteOpen}
        onOpenChange={setIsInviteOpen}
      />

      <DeleteWorkspaceDialog
        workspaceId={workspace.workspace_id}
        isActive={isActive}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
      />
    </>
  )
}

export const WorkspaceRail = () => {
  const { workspace_memberships } = useBootstrap()
  const { orderedWorkspaces, saveOrder } = useWorkspaceOrder(
    workspace_memberships
  )
  const [isSorting, setIsSorting] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const pathname = usePathname()
  const isWorkspaceRoute = pathname.startsWith("/workspaces/")

  const isWorkspaceActive = (workspaceId: string) => {
    const href = `/workspaces/${workspaceId}`

    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <nav
      ref={navRef}
      className="flex w-16 shrink-0 flex-col items-center gap-2 overflow-y-auto border-r bg-muted/40 py-3"
    >
      <Link
        href="/dms"
        aria-current={isWorkspaceRoute ? undefined : "page"}
        className={railItemClassName}
      >
        DM
      </Link>

      <Separator className="w-8!" />

      <DragDropProvider
        sensors={(defaults) => [
          ...defaults.filter((sensor) => sensor !== KeyboardSensor),
          ...sensors,
        ]}
        modifiers={(defaults) => [
          ...defaults,
          RestrictToVerticalAxis,
          RestrictToElement.configure({ element: () => navRef.current }),
        ]}
        onDragStart={() => setIsSorting(true)}
        onDragEnd={(event) => {
          setIsSorting(false)

          if (event.canceled) {
            return
          }

          saveOrder(
            move(
              orderedWorkspaces.map((workspace) => workspace.workspace_id),
              event
            )
          )
        }}
      >
        {orderedWorkspaces.map((workspace, index) => (
          <WorkspaceRailItem
            key={workspace.workspace_id}
            workspace={workspace}
            index={index}
            isActive={isWorkspaceActive(workspace.workspace_id)}
            isSorting={isSorting}
          />
        ))}
      </DragDropProvider>

      <CreateWorkspaceDialog />
    </nav>
  )
}
