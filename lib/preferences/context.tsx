"use client"

import {
  createContext,
  use,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react"

import {
  preferencesCookieName,
  type PreferencesType,
} from "@/lib/preferences/schema"

const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365

type PreferenceKeyType = keyof PreferencesType

type PreferencesContextType = {
  preferences: PreferencesType
  setPreference: <K extends PreferenceKeyType>(
    key: K,
    value: PreferencesType[K]
  ) => void
}

const PreferencesContext = createContext<PreferencesContextType | null>(null)

// Seeded with the cookie the (app) layout read, so client components render the same values the server did.
export const PreferencesProvider = ({
  userId,
  initialPreferences,
  children,
}: {
  userId: string
  initialPreferences: PreferencesType
  children: React.ReactNode
}) => {
  const [preferences, setPreferences] = useState(initialPreferences)
  // Back-to-back writes each need the previous one's result to build the cookie.
  const preferencesRef = useRef(initialPreferences)

  const setPreference = useCallback(
    <K extends PreferenceKeyType>(key: K, value: PreferencesType[K]) => {
      const nextPreferences = { ...preferencesRef.current, [key]: value }

      preferencesRef.current = nextPreferences
      setPreferences(nextPreferences)

      document.cookie = `${preferencesCookieName(userId)}=${encodeURIComponent(
        JSON.stringify(nextPreferences)
      )}; path=/; max-age=${ONE_YEAR_IN_SECONDS}; samesite=lax`
    },
    [userId]
  )

  const value = useMemo(
    () => ({ preferences, setPreference }),
    [preferences, setPreference]
  )

  return <PreferencesContext value={value}>{children}</PreferencesContext>
}

export const usePreference = <K extends PreferenceKeyType>(key: K) => {
  const context = use(PreferencesContext)

  if (!context) {
    throw new Error("usePreference must be used within PreferencesProvider")
  }

  const { preferences, setPreference } = context

  const setValue = useCallback(
    (value: PreferencesType[K]) => setPreference(key, value),
    [key, setPreference]
  )

  return [preferences[key], setValue] as const
}
