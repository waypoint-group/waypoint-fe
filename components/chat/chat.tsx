"use client"

import { ChatComposer } from "./chat-composer"
import { ChatHeader } from "./chat-header"
import { MessageList } from "./message-list"
import type { MessageGroupType } from "./types"

type ChatPropsType = {
  channelName: string
  channelDescription?: string
  messageGroups: MessageGroupType[]
  messagePlaceholder?: string
  onSendMessage?: (message: string) => void
  disabled?: boolean
}

export const Chat = ({
  channelName,
  channelDescription,
  messageGroups,
  messagePlaceholder,
  onSendMessage,
  disabled = false,
}: ChatPropsType) => {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <ChatHeader name={channelName} description={channelDescription} />

      <MessageList groups={messageGroups} />

      <ChatComposer
        placeholder={messagePlaceholder}
        onSubmit={onSendMessage}
        disabled={disabled}
      />
    </div>
  )
}
