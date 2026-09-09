import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { Toggle } from "@/components/ui/toggle"

const meta = {
  component: Toggle,
  tags: ["ai-generated"],
  args: {
    children: "Bold",
    "aria-label": "Toggle bold",
  },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole("button", { name: /toggle bold/i })
    await expect(toggle).toHaveAttribute("aria-pressed", "false")
    await userEvent.click(toggle)
    await expect(toggle).toHaveAttribute("aria-pressed", "true")
  },
}

export const Pressed: Story = { args: { defaultPressed: true } }
export const Outline: Story = { args: { variant: "outline" } }
