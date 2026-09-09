import { auth } from "@/auth"
import { SocialSignInButton } from "@/components/social-sign-in-button"
import { SignOutButton } from "@/components/sign-out-button"
import { AdIcon, TvIcon } from "lucide-react"

const Page = async () => {
  const session = await auth()

  return (
    <div className="flex min-h-svh flex-col p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        {session?.user ? (
          <>
            <p>Welcome, {session.user.name}!</p>
            <SignOutButton />
          </>
        ) : (
          <>
            <p>You are not signed in.</p>
            <SocialSignInButton provider="google">
              <AdIcon />
            </SocialSignInButton>
            <SocialSignInButton provider="github">
              <TvIcon />
            </SocialSignInButton>
          </>
        )}
      </div>
    </div>
  )
}

export default Page
