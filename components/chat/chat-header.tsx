"use client"

import { Hash } from "lucide-react"

type ChatHeaderPropsType = {
  name: string
  description?: string
}

export const ChatHeader = ({ name, description }: ChatHeaderPropsType) => {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
      <Hash className="size-5 text-muted-foreground" />

      <div className="min-w-0">
        <h2 className="truncate font-semibold">{name}</h2>

        {description && (
          <p className="truncate text-xs text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </header>
  )
}
