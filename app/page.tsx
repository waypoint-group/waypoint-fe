import { getBootstrap } from "@/features/bootstrap/data"
import { SocialSignInButton } from "@/features/auth/components/social-sign-in-button"
import { AdIcon, TvIcon } from "lucide-react"
import { redirect } from "next/navigation"

const PageShell = ({ children }: { children: React.ReactNode }) => (
  <div className="flex min-h-full flex-col p-6">
    <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm">
      {children}
    </div>
  </div>
)

const SignedOutView = () => (
  <PageShell>
    <p>You are not signed in.</p>
    <SocialSignInButton provider="google">
      <AdIcon />
    </SocialSignInButton>
    <SocialSignInButton provider="github">
      <TvIcon />
    </SocialSignInButton>
  </PageShell>
)

const Page = async () => {
  const result = await getBootstrap()

  if (result.status === "onboardingRequired") {
    redirect("/onboarding")
  }

  if (result.status === "ok") {
    redirect("/dms")
  }

  return <SignedOutView />
}

export default Page
