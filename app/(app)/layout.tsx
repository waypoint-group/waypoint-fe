import { redirect } from "next/navigation"

import { BootstrapProvider } from "@/lib/bootstrap/context"
import { getBootstrap } from "@/lib/bootstrap/data"
import { WorkspaceRail } from "@/features/workspaces/components/workspace-rail"

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  const result = await getBootstrap()

  if (result.status === "unauthenticated") {
    redirect("/")
  }

  if (result.status === "onboardingRequired") {
    redirect("/onboarding")
  }

  return (
    <BootstrapProvider value={result.data}>
      <div className="flex h-svh overflow-hidden">
        <WorkspaceRail />
        {children}
      </div>
    </BootstrapProvider>
  )
}

export default AppLayout
