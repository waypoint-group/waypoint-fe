import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { Button } from "@/components/ui/button"

const meta = {
  component: Button,
  tags: ["ai-generated"],
  args: {
    children: "Order now",
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// Smoke check — one is enough per file
export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("button", { name: /order now/i })
    ).toBeVisible()
  },
}

export const Outline: Story = { args: { variant: "outline" } }
export const Secondary: Story = { args: { variant: "secondary" } }
export const Ghost: Story = { args: { variant: "ghost" } }
export const Destructive: Story = { args: { variant: "destructive" } }
export const Link: Story = { args: { variant: "link" } }
export const Disabled: Story = { args: { disabled: true } }

// Proves the shared preview loaded Tailwind + globals.css (bg-primary resolves to a real color).
export const CssCheck: Story = {
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: /order now/i })
    // default variant uses bg-primary, which is oklch(0.205 0 0) in light mode.
    await expect(getComputedStyle(button).backgroundColor).toBe(
      "oklch(0.205 0 0)"
    )
  },
}
