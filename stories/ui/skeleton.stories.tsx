import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Skeleton } from "@/components/ui/skeleton"

const meta = {
  component: Skeleton,
  tags: ["ai-generated"],
  args: {
    className: "h-4 w-32",
  },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

// Variant-only story: no play needed, render itself proves the component mounts
export const Default: Story = {}

export const Avatar: Story = {
  args: { className: "size-10 rounded-full" },
}

export const ProfileCard: Story = {
  render: () => (
    <div className="flex items-center gap-3 rounded-lg border p-4">
      <Skeleton className="size-10 shrink-0 rounded-full" />
      <div className="min-w-0 flex-1 space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-48" />
      </div>
    </div>
  ),
}

// Mirrors the real message list layout (components/chat/message-group.tsx) while messages are loading
export const MessageListLoading: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex gap-3">
          <Skeleton className="mt-0.5 size-10 shrink-0 rounded-full" />
          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-full max-w-md" />
            <Skeleton className="h-3 w-2/3 max-w-sm" />
          </div>
        </div>
      ))}
    </div>
  ),
}
