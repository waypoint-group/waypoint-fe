"use client"

import { Plus, Send, Smile } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

type ChatComposerPropsType = {
  placeholder?: string
  onSubmit?: (message: string) => void
  disabled?: boolean
}

export const ChatComposer = ({
  placeholder = "Write a message...",
  onSubmit,
  disabled = false,
}: ChatComposerPropsType) => {
  const [message, setMessage] = useState("")

  const handleSubmit = () => {
    const trimmedMessage = message.trim()

    if (!trimmedMessage || disabled) {
      return
    }

    onSubmit?.(trimmedMessage)
    setMessage("")
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="shrink-0 border-t p-4">
      <div className="rounded-lg border bg-background">
        <Textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="max-h-96 min-h-14 resize-none border-0 shadow-none focus-visible:ring-0"
        />

        <div className="flex items-center justify-between rounded-b-lg bg-transparent p-2 dark:bg-input/30">
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              disabled={disabled}
              aria-label="Add attachment"
              className="opacity-50 hover:opacity-100"
            >
              <Plus className="size-5" />
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              disabled={disabled}
              aria-label="Add emoji"
              className="opacity-50 hover:opacity-100"
            >
              <Smile className="size-5" />
            </Button>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={disabled || !message.trim()}
            onClick={handleSubmit}
            aria-label="Send message"
            className="opacity-50 hover:opacity-100"
          >
            <Send className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
