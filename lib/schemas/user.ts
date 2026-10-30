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
