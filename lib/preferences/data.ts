import "server-only"

import { cookies } from "next/headers"

import {
  preferencesCookieName,
  preferencesSchema,
  type PreferencesType,
} from "@/lib/preferences/schema"

export const getPreferences = async (
  userId: string
): Promise<PreferencesType> => {
  const cookie = (await cookies()).get(preferencesCookieName(userId))

  if (!cookie) {
    return {}
  }

  try {
    return preferencesSchema.parse(JSON.parse(cookie.value))
  } catch {
    return {}
  }
}
