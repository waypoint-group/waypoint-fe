"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { PlusIcon } from "lucide-react"
import { useRouter } from "next/navigation"
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
import { createWorkspace } from "@/features/workspaces/actions"
import {
  createWorkspaceSchema,
  type CreateWorkspaceFormValuesType,
} from "@/features/workspaces/schema"

export const CreateWorkspaceDialog = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const form = useForm<CreateWorkspaceFormValuesType>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: "",
    },
  })

  const onSubmit = async (values: CreateWorkspaceFormValuesType) => {
    setSubmitError(null)

    const result = await createWorkspace(values)

    if (result.status === "error") {
      setSubmitError(result.message)
      return
    }

    setOpen(false)
    router.push(`/workspaces/${result.workspaceId}`)
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
      <DialogTrigger
        aria-label="Create workspace"
        className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-background text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
      >
        <PlusIcon className="size-5" />
      </DialogTrigger>

      <DialogContent>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <DialogHeader className="gap-1">
            <DialogTitle className="text-lg">Create a workspace</DialogTitle>
            <DialogDescription>
              Give your new workspace a name.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-2">
            <Label htmlFor="workspace-name">Workspace name</Label>

            <Input
              id="workspace-name"
              placeholder="My Workspace"
              autoComplete="off"
              aria-invalid={!!form.formState.errors.name}
              {...form.register("name")}
            />

            {form.formState.errors.name && (
              <p className="text-sm text-destructive">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          {submitError && (
            <p className="text-sm text-destructive">{submitError}</p>
          )}

          <DialogFooter>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
