"use client"

import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const themeOptions = [
  { value: "light", label: "Light", icon: SunIcon },
  { value: "dark", label: "Dark", icon: MoonIcon },
  { value: "system", label: "System", icon: MonitorIcon },
]

export const ThemeSection = () => {
  const { theme, setTheme } = useTheme()

  return (
    <RadioGroup
      aria-label="Theme"
      value={theme}
      onValueChange={(value) => setTheme(value as string)}
      className="grid-cols-3"
    >
      {themeOptions.map(({ value, label, icon: Icon }) => (
        <Label
          key={value}
          className="flex cursor-pointer flex-col items-center gap-3 rounded-lg border p-4 has-data-checked:border-primary has-data-checked:bg-muted/40"
        >
          <Icon className="size-6 text-muted-foreground" />
          <span className="flex items-center gap-2">
            <RadioGroupItem value={value} />
            {label}
          </span>
        </Label>
      ))}
    </RadioGroup>
  )
}
