import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, fn } from "storybook/test"

import type { MessageGroupType } from "@/components/chat/types"
import { Chat } from "@/components/chat/chat"

const messageGroups: MessageGroupType[] = [
  {
    id: "group-1",
    user: { id: "user-1", name: "John Doe" },
    messages: [
      {
        id: "message-1",
        content: "Hey everyone!",
        createdAt: new Date("2024-04-01T12:00:00Z"),
      },
      {
        id: "message-2",
        content: "How's everyone doing?",
        createdAt: new Date("2024-04-01T12:01:00Z"),
      },
    ],
  },
  {
    id: "group-2",
    user: { id: "user-2", name: "Maria Lund" },
    messages: [
      {
        id: "message-3",
        content: "Doing great, thanks!",
        createdAt: new Date("2024-04-01T12:02:00Z"),
      },
      {
        id: "message-4",
        content: "What about you?",
        createdAt: new Date("2024-04-01T12:03:00Z"),
      },
    ],
  },
  {
    id: "group-3",
    user: { id: "user-1", name: "John Doe" },
    messages: [
      {
        id: "message-5",
        content: "Glad to hear, I am doing well too.",
        createdAt: new Date("2024-04-01T12:02:00Z"),
      },
    ],
  },
]

const meta = {
  component: Chat,
  tags: ["ai-generated"],
  args: {
    channelName: "general",
    channelDescription: "Team-wide announcements",
    messageGroups,
    onSendMessage: fn(),
  },
} satisfies Meta<typeof Chat>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText("general")).toBeVisible()
    await expect(canvas.getByText("John Doe")).toBeVisible()
    await expect(canvas.getByText("Doing great, thanks!")).toBeVisible()
  },
}

export const SendMessage: Story = {
  play: async ({ canvas, userEvent, args }) => {
    const textarea = canvas.getByPlaceholderText("Write a message...")
    await userEvent.type(textarea, "New message{Enter}")
    await expect(args.onSendMessage).toHaveBeenCalledWith("New message")
  },
}

export const Empty: Story = { args: { messageGroups: [] } }
