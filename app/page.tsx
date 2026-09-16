import { auth } from "@/auth"
import { backendFetch } from "@/lib/backend"
import { meResponseSchema } from "@/lib/validations/me"
import { SocialSignInButton } from "@/components/social-sign-in-button"
import { SignOutButton } from "@/components/sign-out-button"
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
  const session = await auth()

  // A failed token refresh keeps session.user populated, so check the error/token explicitly.
  if (
    !session?.user ||
    !session?.accessToken ||
    session.error === "RefreshAccessTokenError"
  ) {
    return <SignedOutView />
  }

  const response = await backendFetch("/me", undefined, session)

  if (response.status === 401) {
    return <SignedOutView />
  }

  if (response.status === 404) {
    redirect("/onboarding")
  }

  if (!response.ok) {
    throw new Error(`Backend returned ${response.status}`)
  }

  const user = meResponseSchema.parse(await response.json())

  return (
    <PageShell>
      <p>Welcome, {user.displayName}!</p>
      <SignOutButton />
    </PageShell>
  )
}

export default Page
