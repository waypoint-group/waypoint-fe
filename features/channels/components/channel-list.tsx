import type { WorkspaceType } from "@/lib/schemas/workspace"

// Placeholder: will list the channels of the given workspace.
export const ChannelList = ({ workspace }: { workspace: WorkspaceType }) => (
  <div className="flex h-full flex-col gap-2 p-3">
    <h2 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
      {workspace.name}
    </h2>
  </div>
)
