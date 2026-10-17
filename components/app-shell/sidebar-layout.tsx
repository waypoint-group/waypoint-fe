import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ProfileBar } from "@/features/auth/components/profile-bar"

export const SidebarLayout = ({
  sidebar,
  children,
}: {
  sidebar: React.ReactNode
  children: React.ReactNode
}) => (
  <ResizablePanelGroup orientation="horizontal" className="min-w-0 flex-1">
    <ResizablePanel defaultSize="260px" minSize="180px" maxSize="320px">
      <div className="flex h-full flex-col">
        <div className="min-h-0 flex-1">{sidebar}</div>

        <ProfileBar />
      </div>
    </ResizablePanel>

    <ResizableHandle />

    <ResizablePanel>{children}</ResizablePanel>
  </ResizablePanelGroup>
)
