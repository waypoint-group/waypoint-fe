"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"

type SocialSignInPropsType = {
  provider: "google" | "github"
  label: string
  children: React.ReactNode
}

export const SocialSignInButton = ({
  provider,
  label,
  children,
}: SocialSignInPropsType) => {
  return (
    <Button
      variant="ghost"
      type="button"
      aria-label={label}
      title={label}
      className="size-auto rounded-full p-1 opacity-80 hover:bg-transparent hover:opacity-100 dark:hover:bg-transparent [&_svg:not([class*='size-'])]:size-12"
      onClick={() =>
        signIn("keycloak", undefined, {
          kc_idp_hint: provider,
        })
      }
    >
      {children}
    </Button>
  )
}
