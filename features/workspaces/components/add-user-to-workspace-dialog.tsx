"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { UserRoundPlusIcon } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { addWorkspaceMember } from "@/features/workspaces/actions"
import {
  addWorkspaceMemberSchema,
  type AddWorkspaceMemberFormValuesType,
} from "@/features/workspaces/schema"

export const AddUserToWorkspaceDialog = ({
  workspaceId,
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
  const [submitError, setSubmitError] = useState<string | null>(null)

  const form = useForm<AddWorkspaceMemberFormValuesType>({
    resolver: zodResolver(addWorkspaceMemberSchema),
    defaultValues: {
      username: "",
    },
  })

  const onSubmit = async (values: AddWorkspaceMemberFormValuesType) => {
    setSubmitError(null)

    const result = await addWorkspaceMember(workspaceId, values)

    if (result.status === "error") {
      setSubmitError(result.message)
      return
    }

    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      // Reset after the close animation so the content doesn't flash empty while fading out.
      onOpenChangeComplete={(isOpen) => {
        if (!isOpen) {
          form.reset()
          setSubmitError(null)
        }
      }}
    >
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

      <DialogContent>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <DialogHeader className="gap-1">
            <DialogTitle className="text-lg">
              Add a user to workspace
            </DialogTitle>
            <DialogDescription>
              Enter the username of the person you want to add to{" "}
              {workspaceName}.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-2">
            <Label htmlFor="member-username">Username</Label>

            <Input
              id="member-username"
              placeholder="username"
              autoComplete="off"
              aria-invalid={!!form.formState.errors.username}
              {...form.register("username")}
            />

            {form.formState.errors.username && (
              <p className="text-sm text-destructive">
                {form.formState.errors.username.message}
              </p>
            )}
          </div>

          {submitError && (
            <p className="text-sm text-destructive">{submitError}</p>
          )}

          <DialogFooter>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Adding..." : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
