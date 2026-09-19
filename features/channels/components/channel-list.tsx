// Placeholder: will list the channels of the workspace given by workspaceId.
export const ChannelList = ({ workspaceId }: { workspaceId: string }) => (
  <div className="flex h-full flex-col gap-2 p-3">
    <h2 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
      {workspaceId}
    </h2>
  </div>
)
