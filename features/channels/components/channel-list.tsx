import type { WorkspaceType } from "@/lib/schemas/workspace"
import { AddUserToWorkspaceDialog } from "@/features/workspaces/components/add-user-to-workspace-dialog"

// Placeholder: will list the channels of the given workspace.
export const ChannelList = ({ workspace }: { workspace: WorkspaceType }) => (
  <div className="flex h-full flex-col gap-2 p-4">
    <div className="flex items-center justify-between">
      <h2 className="text-base font-semibold tracking-wide text-foreground uppercase">
        {workspace.name}
      </h2>

      <AddUserToWorkspaceDialog
        workspaceId={workspace.id}
        workspaceName={workspace.name}
      />
    </div>
  </div>
)
