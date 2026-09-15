import { redirect } from "next/navigation"
import { backendFetch } from "@/lib/backend"
import { OnboardingCard } from "@/components/onboarding-card"

const OnboardingPage = async () => {
  const response = await backendFetch("/me")

  if (response.ok) {
    redirect("/")
  }

  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <OnboardingCard />
    </main>
  )
}

export default OnboardingPage
