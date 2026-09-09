import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const meta = {
  component: Avatar,
  tags: ["ai-generated"],
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const WithFallback: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="/does-not-exist.png" alt="Ivan" />
      <AvatarFallback>IV</AvatarFallback>
    </Avatar>
  ),
  play: async ({ canvasElement }) => {
    // the image never loads, so the fallback text proves the composition renders
    await expect(canvasElement).toHaveTextContent("IV")
  },
}

export const Small: Story = {
  render: (args) => (
    <Avatar {...args} size="sm">
      <AvatarFallback>SM</AvatarFallback>
    </Avatar>
  ),
}

export const Large: Story = {
  render: (args) => (
    <Avatar {...args} size="lg">
      <AvatarFallback>LG</AvatarFallback>
    </Avatar>
  ),
}
