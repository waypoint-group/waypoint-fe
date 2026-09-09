"use client"

import { ScrollArea } from "@/components/ui/scroll-area"

import { MessageGroupType } from "./types"
import { MessageGroup } from "./message-group"

type MessageListPropsType = {
  groups: MessageGroupType[]
}

export const MessageList = ({ groups }: MessageListPropsType) => {
  return (
    <ScrollArea className="min-h-0 flex-1">
      <div className="flex flex-col py-4">
        {groups.map((group) => (
          <MessageGroup
            key={group.id}
            user={group.user}
            messages={group.messages}
          />
        ))}
      </div>
    </ScrollArea>
  )
}
