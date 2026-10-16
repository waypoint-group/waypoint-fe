import { getBootstrap } from "@/lib/bootstrap/data"
import { SocialSignInButton } from "@/features/auth/components/social-sign-in-button"
import {
  GitHubIcon,
  GoogleIcon,
} from "@/features/auth/components/provider-icons"
import { redirect } from "next/navigation"

const SignedOutView = () => (
  <main className="flex min-h-svh flex-col items-center justify-center gap-8 p-6 text-center">
    <div className="flex flex-col gap-4">
      <h1 className="font-heading text-5xl font-bold tracking-tight">
        Waypoint
      </h1>
      <p className="text-sm text-muted-foreground">
        Sign in with one of the providers below to continue.
      </p>
    </div>
    <div className="flex items-center gap-8">
      <SocialSignInButton provider="google" label="Sign in with Google">
        <GoogleIcon />
      </SocialSignInButton>
      <SocialSignInButton provider="github" label="Sign in with GitHub">
        <GitHubIcon />
      </SocialSignInButton>
    </div>
  </main>
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
