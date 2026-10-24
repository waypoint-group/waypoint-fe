"use client"

import { usePanelRef } from "react-resizable-panels"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ProfileBar } from "@/features/auth/components/profile-bar"
import { usePreference } from "@/lib/preferences/context"

const DEFAULT_SIDEBAR_WIDTH = 260

export const SidebarLayout = ({
  sidebar,
  children,
}: {
  sidebar: React.ReactNode
  children: React.ReactNode
}) => {
  const [sidebarWidth, setSidebarWidth] = usePreference("sidebarWidth")
  const sidebarRef = usePanelRef()

  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="min-w-0 flex-1"
      // Only user drags are saved, so a window resize squeezing the sidebar doesn't overwrite the chosen width.
      onLayoutChanged={(_, { isUserInteraction }) => {
        if (isUserInteraction && sidebarRef.current) {
          setSidebarWidth(sidebarRef.current.getSize().inPixels)
        }
      }}
    >
      <ResizablePanel
        panelRef={sidebarRef}
        // Pixels rather than a percentage, so the server renders the saved width without knowing the viewport.
        defaultSize={`${sidebarWidth ?? DEFAULT_SIDEBAR_WIDTH}px`}
        minSize="180px"
        maxSize="320px"
      >
        <div className="flex h-full flex-col">
          <div className="min-h-0 flex-1">{sidebar}</div>

          <ProfileBar />
        </div>
      </ResizablePanel>

      <ResizableHandle />

      <ResizablePanel>{children}</ResizablePanel>
    </ResizablePanelGroup>
  )
}
