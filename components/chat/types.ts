export type ChatUserType = {
  id: string
  name: string
  avatarUrl?: string
}

export type ChatMessageType = {
  id: string
  content: string
  createdAt: Date
}

export type MessageGroupType = {
  id: string
  user: ChatUserType
  messages: ChatMessageType[]
}
