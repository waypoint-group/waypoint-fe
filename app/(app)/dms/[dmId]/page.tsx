import { Chat } from "@/features/chat/components/chat"

const DirectMessagePage = async ({ params }: PageProps<"/dms/[dmId]">) => {
  const { dmId } = await params

  return <Chat channelName={dmId} messageGroups={[]} />
}

export default DirectMessagePage
