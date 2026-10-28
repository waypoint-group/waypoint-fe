"use client"

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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { deleteAccount } from "@/features/settings/actions"

export const DeleteAccountDialog = ({ userId }: { userId: string }) => {
  const [open, setOpen] = useState(false)
  const [isDeleting, startTransition] = useTransition()
  const [submitError, setSubmitError] = useState<string | null>(null)

  const onConfirm = () => {
    setSubmitError(null)

    startTransition(async () => {
      // Only resolves on failure; success redirects to the signed-out landing page.
      const result = await deleteAccount(userId)

      setSubmitError(result.message)
    })
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={(isOpen) => {
        // Keep the dialog up while the request is in flight.
        if (!isDeleting) {
          setOpen(isOpen)
        }
      }}
      onOpenChangeComplete={(isOpen) => {
        if (!isOpen) {
          setSubmitError(null)
        }
      }}
    >
      <AlertDialogTrigger render={<Button variant="destructive" />}>
        Delete Account
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="text-wrap">
            This action cannot be undone. This will permanently delete your
            account, along with every workspace you own.
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
