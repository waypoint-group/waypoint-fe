import { z } from "zod"

// Stored in a cookie rather than localStorage so the server can render with them and nothing shifts after hydration.
// TODO: Move to the backend once it supports it, so preferences follow the user across devices.
export const preferencesCookieName = (userId: string) =>
  `waypoint-preferences-${userId}`

// Fields fail independently, so one corrupt value doesn't reset the rest.
export const preferencesSchema = z.object({
  workspaceOrder: z.array(z.string()).optional().catch(undefined),
  sidebarWidth: z.number().positive().optional().catch(undefined),
})

export type PreferencesType = z.infer<typeof preferencesSchema>
