import { z } from "zod"

// Lightweight entry for the workspace rail; the full workspace is fetched separately on open.
export const workspacePreviewSchema = z.object({
  id: z.string(),
  name: z.string(),
})

export type WorkspacePreviewType = z.infer<typeof workspacePreviewSchema>

export const workspaceSchema = workspacePreviewSchema
  .extend({
    members: z.array(
      z
        .object({
          user_id: z.string(),
          role: z.string(),
        })
        .transform(({ user_id, ...rest }) => ({ ...rest, userId: user_id }))
    ),
    created_at: z.iso.datetime({ offset: true }),
  })
  .transform(({ created_at, ...rest }) => ({ ...rest, createdAt: created_at }))

export type WorkspaceType = z.infer<typeof workspaceSchema>
