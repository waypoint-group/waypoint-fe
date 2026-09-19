import Link from "next/link"

// Placeholder: will render the user's joined workspaces from bootstrap data.
export const WorkspaceRail = () => (
  <nav className="flex w-16 shrink-0 flex-col items-center gap-2 border-r bg-muted/40 py-3">
    <Link
      href="/dms"
      className="flex size-11 items-center justify-center rounded-2xl bg-background text-sm font-semibold"
    >
      DM
    </Link>
  </nav>
)
