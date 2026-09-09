import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { Switch } from "@/components/ui/switch"

const meta = {
  component: Switch,
  tags: ["ai-generated"],
  args: {
    "aria-label": "Enable notifications",
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Off: Story = {
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole("switch", { name: /enable notifications/i })
    await expect(toggle).toHaveAttribute("aria-checked", "false")
    await userEvent.click(toggle)
    await expect(toggle).toHaveAttribute("aria-checked", "true")
  },
}

export const On: Story = { args: { defaultChecked: true } }
export const Small: Story = { args: { size: "sm" } }
export const Disabled: Story = { args: { disabled: true } }
