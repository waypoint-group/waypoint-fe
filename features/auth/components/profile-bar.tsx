"use client"

import {
  CircleUserIcon,
  LogOutIcon,
  SettingsIcon,
  UserRound,
} from "lucide-react"

import { Avatar, AvatarBadge, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { logout } from "@/features/auth/actions"
import { useBootstrap } from "@/lib/bootstrap/context"

export const ProfileBar = () => {
  const { user } = useBootstrap()

  return (
    <div className="flex items-center gap-2 border-t bg-muted/40 p-3">
      <Avatar>
        {/* Users don't have profile images yet, so the fallback is always shown. */}
        <AvatarFallback className="bg-transparent">
          <UserRound strokeWidth={1.5} />
        </AvatarFallback>
        {/* TODO: Reflect the user's actual presence once it's tracked. */}
        <AvatarBadge className="bg-green-500" />
      </Avatar>

      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm font-semibold">
          {user.displayName}
        </span>
        <span className="text-xs text-muted-foreground">Online</span>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="User settings"
              className="text-muted-foreground"
            />
          }
        >
          <SettingsIcon className="size-5" />
        </DropdownMenuTrigger>

        <DropdownMenuContent side="top" align="end" className="min-w-40">
          <DropdownMenuItem onClick={() => logout()}>
            <LogOutIcon />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
