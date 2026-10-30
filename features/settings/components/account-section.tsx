"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { DeleteAccountDialog } from "@/features/settings/components/delete-account-dialog"
import { useBootstrap } from "@/lib/bootstrap/context"

const AccountField = ({ label, value }: { label: string; value?: string }) => (
  <div className="flex items-center justify-between gap-4">
    <div className="flex min-w-0 flex-col gap-1">
      <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        {label}
      </span>
      {value && <span className="truncate text-sm">{value}</span>}
    </div>

    {/* TODO: Open the matching edit form. */}
    <Button variant="secondary" size="sm">
      Edit
    </Button>
  </div>
)

export const AccountSection = () => {
  const { user } = useBootstrap()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-5 rounded-lg bg-muted/40 p-4">
        <AccountField label="Username" value={user.username} />
        <AccountField label="Display Name" value={user.displayName} />
        <AccountField label="Email" value={user.email} />
        <AccountField label="Password" />
      </div>

      <Separator />

      <div className="flex flex-col items-start gap-3">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold">Delete your account</h3>
          <p className="text-sm text-muted-foreground">
            Permanently delete your account and all of its data. This cannot be
            undone.
          </p>
        </div>

        <DeleteAccountDialog userId={user.id} />
      </div>
    </div>
  )
}
