import { z } from "zod"

// Shared by every form that takes a username, so they all enforce the backend's rules.
export const usernameSchema = z
  .string()
  .min(3, "Username must be at least 3 characters")
  .max(16, "Username must be at most 16 characters")
  .regex(
    /^[a-zA-Z0-9_]+$/,
    "Username can only contain letters, numbers, and underscores"
  )

export const userSchema = z
  .object({
    id: z.uuid(),
    email: z.email(),
    user_name: z.string(),
    display_name: z.string(),
    created_at: z.iso.datetime({ offset: true }),
  })
  .transform(({ user_name, display_name, created_at, ...rest }) => ({
    ...rest,
    username: user_name,
    displayName: display_name,
    createdAt: new Date(created_at),
  }))

export type UserType = z.infer<typeof userSchema>
