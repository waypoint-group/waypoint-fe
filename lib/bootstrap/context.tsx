"use client"

import { createContext, use } from "react"

import type { BootstrapType } from "@/lib/bootstrap/schema"

const BootstrapContext = createContext<BootstrapType | null>(null)

// Holds the /me payload fetched once by the (app) layout, so client components never refetch it.
export const BootstrapProvider = ({
  value,
  children,
}: {
  value: BootstrapType
  children: React.ReactNode
}) => <BootstrapContext value={value}>{children}</BootstrapContext>

export const useBootstrap = () => {
  const bootstrap = use(BootstrapContext)

  if (!bootstrap) {
    throw new Error("useBootstrap must be used within BootstrapProvider")
  }

  return bootstrap
}
