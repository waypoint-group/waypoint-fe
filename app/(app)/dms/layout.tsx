import { SidebarLayout } from "@/components/app-shell/sidebar-layout"
import { DirectMessageList } from "@/features/dms/components/direct-message-list"

const DirectMessagesLayout = ({ children }: { children: React.ReactNode }) => (
  <SidebarLayout sidebar={<DirectMessageList />}>{children}</SidebarLayout>
)

export default DirectMessagesLayout
