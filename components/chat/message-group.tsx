"use client"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import type { ChatUserType, ChatMessageType } from "./types"

type MessageGroupPropsType = {
  user: ChatUserType
  messages: ChatMessageType[]
}

export const MessageGroup = ({ user, messages }: MessageGroupPropsType) => {
  if (messages.length === 0) {
    return null
  }

  const firstMessage = messages[0]

  return (
    <div className="group flex gap-3 px-4 py-1 hover:bg-muted/50">
      {/* Avatar */}
      <Avatar className="mt-0.5 size-10 shrink-0">
        <AvatarImage src={user.avatarUrl} alt={user.name} />
        <AvatarFallback>
          {user.name
            .split(" ")
            .map((name) => name[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()}
        </AvatarFallback>
      </Avatar>

      {/* Messages */}
      <div className="min-w-0 flex-1">
        {/* Header */}
        <div className="flex items-baseline gap-2">
          <span className="font-semibold">{user.name}</span>

          <time
            dateTime={firstMessage.createdAt.toISOString()}
            className="text-xs text-muted-foreground"
          >
            {firstMessage.createdAt.toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit",
            })}
          </time>
        </div>

        {/* Message contents */}
        <div className="mt-0.5 space-y-0.5">
          {messages.map((message) => (
            <div
              key={message.id}
              className="text-sm break-words whitespace-pre-wrap"
            >
              {message.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
