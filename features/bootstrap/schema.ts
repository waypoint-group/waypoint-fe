import { userSchema } from "@/lib/schemas/user"

// The BE /me payload is currently only the user, it will grow to carry workspaces, DMs, etc.
export const bootstrapSchema = userSchema.transform((user) => ({ user }))

export type BootstrapType = ReturnType<typeof bootstrapSchema.parse>
