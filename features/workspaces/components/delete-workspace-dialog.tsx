"use client"

import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { deleteWorkspace } from "@/features/workspaces/actions"

export const DeleteWorkspaceDialog = ({
  workspaceId,
  isActive,
  open,
  onOpenChange,
}: {
  workspaceId: string
  // Whether the user is currently viewing this workspace, so we can move them off its route.
  isActive: boolean
  open: boolean
  onOpenChange: (open: boolean) => void
}) => {
  const router = useRouter()
  const [isDeleting, startTransition] = useTransition()
  const [submitError, setSubmitError] = useState<string | null>(null)

  const onConfirm = () => {
    setSubmitError(null)

    startTransition(async () => {
      const result = await deleteWorkspace(workspaceId)

      if (result.status === "error") {
        setSubmitError(result.message)
        return
      }

      onOpenChange(false)

      if (isActive) {
        router.replace("/dms")
      }
    })
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={(isOpen) => {
        // Keep the dialog up while the request is in flight.
        if (!isDeleting) {
          onOpenChange(isOpen)
        }
      }}
      onOpenChangeComplete={(isOpen) => {
        if (!isOpen) {
          setSubmitError(null)
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="text-wrap">
            This action cannot be undone. This will permanently delete this
            workspace.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {submitError && (
          <p className="text-sm text-destructive">{submitError}</p>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
