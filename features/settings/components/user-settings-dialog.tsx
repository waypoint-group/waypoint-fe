"use client"

import { LogOutIcon, SettingsIcon } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { logout } from "@/features/auth/actions"
import { AccountSection } from "@/features/settings/components/account-section"
import { ThemeSection } from "@/features/settings/components/theme-section"

const sections = {
  account: { label: "Account", content: AccountSection },
  theme: { label: "Theme", content: ThemeSection },
}

type SectionType = keyof typeof sections

const navItemClassName =
  "flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground aria-[current=true]:bg-muted aria-[current=true]:font-medium aria-[current=true]:text-foreground"

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

      <DialogContent className="flex h-[min(36rem,85svh)] gap-0 overflow-hidden p-0 sm:max-w-3xl">
        <nav className="flex w-48 shrink-0 flex-col gap-1 border-r bg-muted/40 p-3">
          <span className="px-2 pb-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
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
              {section.label}
            </button>
          ))}

          <Separator className="my-2" />

          <button
            type="button"
            onClick={() => logout()}
            className={navItemClassName}
          >
            <LogOutIcon className="size-4" />
            Sign Out
          </button>
        </nav>

        <div className="flex min-w-0 flex-1 flex-col gap-6 overflow-y-auto p-6">
          <DialogTitle className="text-lg font-semibold">{label}</DialogTitle>

          <SectionContent />
        </div>
      </DialogContent>
    </Dialog>
  )
}
