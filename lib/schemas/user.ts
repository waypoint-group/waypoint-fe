import { z } from "zod"

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
