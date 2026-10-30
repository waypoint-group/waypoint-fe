"use client"

import { UserRoundPlusIcon } from "lucide-react"
import { useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export const AddUserToWorkspaceDialog = ({
  workspaceName,
  open: controlledOpen,
  onOpenChange,
}: {
  workspaceId: string
  workspaceName: string
  // When controlled, the dialog renders no trigger of its own and is opened from elsewhere.
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen

  const setOpen = (isOpen: boolean) => {
    if (isControlled) {
      onOpenChange?.(isOpen)
    } else {
      setUncontrolledOpen(isOpen)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {!isControlled && (
        <Tooltip>
          <TooltipTrigger
            render={
              <DialogTrigger
                aria-label="Add user to workspace"
                className="text-muted-foreground transition-colors hover:text-foreground"
              />
            }
          >
            <UserRoundPlusIcon className="size-5" />
          </TooltipTrigger>

          <TooltipContent side="right">Add user to workspace</TooltipContent>
        </Tooltip>
      )}

      <DialogContent className="flex flex-col gap-6">
        <DialogHeader className="gap-1">
          <DialogTitle className="text-lg">Add a user to workspace</DialogTitle>
          <DialogDescription>
            Invite friends to {workspaceName}.
          </DialogDescription>
        </DialogHeader>

        {/* TODO: Replace with the friend list once friends are implemented, adding the selected friend via addWorkspaceMember(workspaceId, userId). */}
        <p className="text-sm text-muted-foreground">
          Add friends first to be able to invite them to a workspace.
        </p>

        <DialogFooter showCloseButton />
      </DialogContent>
    </Dialog>
  )
}
