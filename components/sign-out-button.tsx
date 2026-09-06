"use client"

import { logout } from "@/app/actions/logout"

export const SignOutButton = () => {
  return <button onClick={() => logout()}>Sign out</button>
}
