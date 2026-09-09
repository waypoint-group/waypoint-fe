import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, fn } from "storybook/test"

import { ChatComposer } from "@/components/chat/chat-composer"

const meta = {
  component: ChatComposer,
  tags: ["ai-generated"],
  args: {
    onSubmit: fn(),
  },
} satisfies Meta<typeof ChatComposer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas, userEvent, args }) => {
    const textarea = canvas.getByPlaceholderText("Write a message...")
    await userEvent.type(textarea, "Hello team{Enter}")
    await expect(args.onSubmit).toHaveBeenCalledWith("Hello team")
    // the composer clears its draft after a successful submit
    await expect(textarea).toHaveValue("")
  },
}

export const CustomPlaceholder: Story = {
  args: { placeholder: "Message #general" },
}

export const Disabled: Story = { args: { disabled: true } }
