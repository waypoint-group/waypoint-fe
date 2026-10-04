import { z } from "zod"

import { userSchema } from "@/lib/schemas/user"
import { type WorkspacePreviewType } from "@/lib/schemas/workspace"

// Bootstrap returns membership entries with prefixed keys, unlike the /workspaces endpoints.
const workspaceMembershipSchema = z
  .object({
    workspace_id: z.string(),
    workspace_name: z.string(),
  })
  .transform(({ workspace_id, workspace_name }): WorkspacePreviewType => ({
    id: workspace_id,
    name: workspace_name,
  }))

export const bootstrapSchema = z
  .object({
    user: userSchema,
    workspace_memberships: z.array(workspaceMembershipSchema),
  })
  .transform(({ workspace_memberships, ...rest }) => ({
    ...rest,
    workspaceMemberships: workspace_memberships,
  }))

export type BootstrapType = ReturnType<typeof bootstrapSchema.parse>
