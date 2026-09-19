import { redirect } from "next/navigation"

import { getBootstrap } from "@/features/bootstrap/data"
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
    <div className="flex h-svh overflow-hidden">
      <WorkspaceRail />
      {children}
    </div>
  )
}

export default AppLayout
