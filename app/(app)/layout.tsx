import { redirect } from "next/navigation"

import { BootstrapProvider } from "@/lib/bootstrap/context"
import { getBootstrap } from "@/lib/bootstrap/data"
import { PreferencesProvider } from "@/lib/preferences/context"
import { getPreferences } from "@/lib/preferences/data"
import { WorkspaceRail } from "@/features/workspaces/components/workspace-rail"

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  const result = await getBootstrap()

  if (result.status === "unauthenticated") {
    redirect("/")
  }

  if (result.status === "onboardingRequired") {
    redirect("/onboarding")
  }

  const preferences = await getPreferences(result.data.user.id)

  return (
    <BootstrapProvider value={result.data}>
      <PreferencesProvider
        userId={result.data.user.id}
        initialPreferences={preferences}
      >
        <div className="flex h-svh overflow-hidden">
          <WorkspaceRail />
          {children}
        </div>
      </PreferencesProvider>
    </BootstrapProvider>
  )
}

export default AppLayout
