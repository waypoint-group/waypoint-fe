import { notFound, redirect } from "next/navigation"

import { SidebarLayout } from "@/components/app-shell/sidebar-layout"
import { ChannelList } from "@/features/channels/components/channel-list"
import { getWorkspace } from "@/features/workspaces/data"

const WorkspaceLayout = async ({
  children,
  params,
}: LayoutProps<"/workspaces/[workspaceId]">) => {
  const { workspaceId } = await params
  const result = await getWorkspace(workspaceId)

  if (result.status === "unauthenticated") {
    redirect("/")
  }

  if (result.status === "notFound") {
    notFound()
  }

  return (
    <SidebarLayout sidebar={<ChannelList workspace={result.data} />}>
      {children}
    </SidebarLayout>
  )
}

export default WorkspaceLayout
