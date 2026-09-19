import { SidebarLayout } from "@/components/app-shell/sidebar-layout"
import { ChannelList } from "@/features/channels/components/channel-list"

const WorkspaceLayout = async ({
  children,
  params,
}: LayoutProps<"/workspaces/[workspaceId]">) => {
  const { workspaceId } = await params

  return (
    <SidebarLayout sidebar={<ChannelList workspaceId={workspaceId} />}>
      {children}
    </SidebarLayout>
  )
}

export default WorkspaceLayout
