import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { Textarea } from "@/components/ui/textarea"

const meta = {
  component: Textarea,
  tags: ["ai-generated"],
  args: {
    placeholder: "Write a message...",
  },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const textarea = canvas.getByPlaceholderText("Write a message...")
    await userEvent.type(textarea, "Hello there")
    await expect(textarea).toHaveValue("Hello there")
  },
}

export const Disabled: Story = { args: { disabled: true } }
export const WithValue: Story = {
  args: { defaultValue: "Existing draft message" },
}
