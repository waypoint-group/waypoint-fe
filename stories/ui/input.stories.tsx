import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { Input } from "@/components/ui/input"

const meta = {
  component: Input,
  tags: ["ai-generated"],
  args: {
    placeholder: "Enter your username",
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByPlaceholderText("Enter your username")
    await userEvent.type(input, "ivan")
    await expect(input).toHaveValue("ivan")
  },
}

export const Disabled: Story = { args: { disabled: true } }
export const WithValue: Story = { args: { defaultValue: "ivan" } }
export const Invalid: Story = { args: { "aria-invalid": true } }

export const Email: Story = {
  args: { type: "email", placeholder: "you@example.com" },
}

export const Password: Story = {
  args: { type: "password", placeholder: "Password" },
}
