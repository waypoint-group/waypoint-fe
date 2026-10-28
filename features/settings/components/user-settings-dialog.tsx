"use client"

import {
  LogOutIcon,
  SettingsIcon,
  SunMoonIcon,
  UserRoundIcon,
  XIcon,
} from "lucide-react"
import { useState } from "react"
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { logout } from "@/features/auth/actions"
import { AccountSection } from "@/features/settings/components/account-section"
import { ThemeSection } from "@/features/settings/components/theme-section"

const sections = {
  account: { label: "Account", icon: UserRoundIcon, content: AccountSection },
  theme: { label: "Theme", icon: SunMoonIcon, content: ThemeSection },
}

type SectionType = keyof typeof sections

const navItemClassName =
  "flex shrink-0 items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm whitespace-nowrap text-muted-foreground transition-colors hover:bg-muted hover:text-foreground aria-[current=true]:bg-muted aria-[current=true]:font-medium aria-[current=true]:text-foreground [&_svg]:size-4 [&_svg]:shrink-0"

export const UserSettingsDialog = () => {
  const [activeSection, setActiveSection] = useState<SectionType>("account")
  const { label, content: SectionContent } = sections[activeSection]

  return (
    <Dialog
      // Reset after the close animation so the content doesn't jump while fading out.
      onOpenChangeComplete={(isOpen) => {
        if (!isOpen) {
          setActiveSection("account")
        }
      }}
    >
      <DialogTrigger
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
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="flex h-[min(36rem,85svh)] flex-col gap-0 overflow-hidden p-0 sm:max-w-3xl sm:flex-row"
      >
        <div className="flex shrink-0 items-center gap-1 border-b bg-muted/40 pr-2 sm:w-48 sm:items-stretch sm:border-r sm:border-b-0 sm:pr-0">
          <nav className="flex min-w-0 flex-1 scrollbar-none gap-1 overflow-x-auto p-2 sm:flex-col sm:overflow-x-visible sm:p-3 [&::-webkit-scrollbar]:hidden">
            <span className="hidden px-2 pb-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase sm:block">
              User Settings
            </span>

            {Object.entries(sections).map(([key, section]) => (
              <button
                key={key}
                type="button"
                aria-current={key === activeSection}
                onClick={() => setActiveSection(key as SectionType)}
                className={navItemClassName}
              >
                <section.icon />
                {section.label}
              </button>
            ))}

            <Separator className="my-2 hidden sm:block" />

            <button
              type="button"
              onClick={() => logout()}
              className={cn(
                navItemClassName,
                "text-destructive hover:bg-destructive/10 hover:text-destructive dark:hover:bg-destructive/20"
              )}
            >
              <LogOutIcon />
              Sign Out
            </button>
          </nav>

          <DialogClose
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                className="shrink-0 sm:absolute sm:top-4 sm:right-4"
              />
            }
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogClose>
        </div>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-6 overflow-y-auto p-4 sm:p-6">
          <DialogTitle className="text-lg font-semibold">{label}</DialogTitle>

          <SectionContent />
        </div>
      </DialogContent>
    </Dialog>
  )
}
