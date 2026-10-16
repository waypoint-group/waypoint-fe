import { z } from "zod"

import { usernameSchema } from "@/lib/schemas/user"

export const onboardingSchema = z.object({
  username: usernameSchema,

  displayName: z
    .string()
    .min(3, "Display name must be at least 3 characters")
    .max(16, "Display name must be at most 16 characters"),
})

export type OnboardingFormValuesType = z.infer<typeof onboardingSchema>

export const createUserRequestSchema = onboardingSchema.transform(
  ({ username, displayName }) => ({
    user_name: username,
    display_name: displayName,
  })
)

export type CreateUserRequestType = z.infer<typeof createUserRequestSchema>
