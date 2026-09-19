import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export const SidebarLayout = ({
  sidebar,
  children,
}: {
  sidebar: React.ReactNode
  children: React.ReactNode
}) => (
  <ResizablePanelGroup orientation="horizontal" className="min-w-0 flex-1">
    <ResizablePanel defaultSize="260px" minSize="180px" maxSize="320px">
      {sidebar}
    </ResizablePanel>

    <ResizableHandle />

    <ResizablePanel>{children}</ResizablePanel>
  </ResizablePanelGroup>
)
