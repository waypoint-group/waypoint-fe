import { Chat } from "@/features/chat/components/chat"

const ChannelPage = async ({
  params,
}: PageProps<"/workspaces/[workspaceId]/[channelId]">) => {
  const { channelId } = await params

  return <Chat channelName={channelId} messageGroups={[]} />
}

export default ChannelPage
