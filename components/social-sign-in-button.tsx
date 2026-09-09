"use client"

import { signIn } from "next-auth/react"
import { Button } from "./ui/button"

type SocialSignInPropsType = {
  provider: "google" | "github"
  children: React.ReactNode
}

export const SocialSignInButton = ({
  provider,
  children,
}: SocialSignInPropsType) => {
  return (
    <Button
      variant="outline"
      size="icon"
      type="button"
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
