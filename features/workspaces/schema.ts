import { z } from "zod"

import { usernameSchema } from "@/lib/schemas/user"

export const createWorkspaceSchema = z.object({
  name: z
    .string()
    .trim()
    // NFC so a decomposed "Č" (C + combining caron) counts as one letter.
    .normalize("NFC")
    .min(3, "Workspace name must be at least 3 characters")
    .max(32, "Workspace name must be at most 32 characters")
    .regex(/^\p{L}/u, "Workspace name must start with a letter")
    .regex(
      /^[\p{L}0-9 _\-.,?!'"]+$/u,
      `Workspace name can only contain letters, numbers, spaces, and - _ . , ? ! ' "`
    ),
})

export type CreateWorkspaceFormValuesType = z.infer<
  typeof createWorkspaceSchema
>

export const addWorkspaceMemberSchema = z.object({
  username: usernameSchema,
})

export type AddWorkspaceMemberFormValuesType = z.infer<
  typeof addWorkspaceMemberSchema
>

export const addWorkspaceMemberRequestSchema =
  addWorkspaceMemberSchema.transform(({ username }) => ({
    user_name: username,
  }))
