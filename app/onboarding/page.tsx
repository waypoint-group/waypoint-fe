import { redirect } from "next/navigation"
import { getBootstrap } from "@/features/bootstrap/data"
import { OnboardingCard } from "@/features/onboarding/components/onboarding-card"

const OnboardingPage = async () => {
  const result = await getBootstrap()

  // Signed-out visitors have nothing to onboard, and existing users are already done.
  if (result.status !== "onboardingRequired") {
    redirect("/")
  }

  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <OnboardingCard />
    </main>
  )
}

export default OnboardingPage
