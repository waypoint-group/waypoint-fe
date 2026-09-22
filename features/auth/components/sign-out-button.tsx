"use client"

import { logout } from "@/features/auth/actions"

export const SignOutButton = () => {
  return <button onClick={() => logout()}>Sign out</button>
}
