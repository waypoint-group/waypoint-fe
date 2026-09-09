import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

const meta = {
  component: Spinner,
  tags: ["ai-generated"],
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("status", { name: /loading/i })).toBeVisible()
  },
}

export const Small: Story = { args: { className: "size-3" } }
export const Large: Story = { args: { className: "size-6" } }
export const Muted: Story = { args: { className: "text-muted-foreground" } }
export const Primary: Story = { args: { className: "size-6 text-primary" } }

// Common real-world usage: a button showing its own pending state while disabled
export const InsideButton: Story = {
  render: (args) => (
    <Button disabled>
      <Spinner {...args} />
      Saving...
    </Button>
  ),
}
