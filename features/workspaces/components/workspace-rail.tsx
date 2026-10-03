"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { CreateWorkspaceDialog } from "@/features/workspaces/components/create-workspace-dialog"
import { useBootstrap } from "@/lib/bootstrap/context"

const railItemClassName =
  "flex size-11 shrink-0 items-center justify-center rounded-2xl bg-background text-sm font-semibold transition-all hover:bg-primary hover:text-primary-foreground aria-[current=page]:rounded-xl aria-[current=page]:bg-primary aria-[current=page]:text-primary-foreground"

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
        <Tooltip key={workspace.id}>
          <TooltipTrigger
            render={
              <Link
                href={`/workspaces/${workspace.id}`}
                aria-label={workspace.name}
                aria-current={
                  isWorkspaceActive(workspace.id) ? "page" : undefined
                }
                className={railItemClassName}
              />
            }
          >
            {workspace.name.charAt(0).toUpperCase()}
          </TooltipTrigger>

          <TooltipContent side="right">{workspace.name}</TooltipContent>
        </Tooltip>
      ))}

      <CreateWorkspaceDialog />
    </nav>
  )
}
