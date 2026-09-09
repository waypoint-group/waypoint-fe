import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const meta = {
  component: Card,
  tags: ["ai-generated"],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Card {...args} className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create your profile</CardTitle>
        <CardDescription>
          Choose a username and display name to get started.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here.</p>
      </CardContent>
      <CardFooter>
        <Button>Continue</Button>
      </CardFooter>
    </Card>
  ),
  play: async ({ canvasElement }) => {
    await expect(canvasElement).toHaveTextContent("Create your profile")
  },
}

export const WithAction: Story = {
  render: (args) => (
    <Card {...args} className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Manage how you receive updates.</CardDescription>
        <CardAction>
          <Button variant="ghost">Dismiss</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>You have 3 unread notifications.</p>
      </CardContent>
    </Card>
  ),
}

export const Small: Story = {
  render: (args) => (
    <Card {...args} size="sm" className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Compact card</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Uses the smaller spacing scale.</p>
      </CardContent>
    </Card>
  ),
}
