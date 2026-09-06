"use client"

import { signIn } from "next-auth/react"
import { Button } from "./ui/button"

type Props = {
  provider: "google" | "github"
  children: React.ReactNode
}

export const SocialSignInButton = ({ provider, children }: Props) => {
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
