import { Geist_Mono, Inter, Roboto } from "next/font/google"

import "./globals.css"
import { QueryProvider } from "@/components/query-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { getBootstrap } from "@/lib/bootstrap/data"
import { cn } from "@/lib/utils"

const robotoHeading = Roboto({ subsets: ["latin"], variable: "--font-heading" })

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

// Scoped per account so each one keeps its own theme; signed-out pages share the default key.
const getThemeStorageKey = async () => {
  try {
    const result = await getBootstrap()

    return result.status === "ok" ? `theme-${result.data.user.id}` : "theme"
  } catch {
    // Pages call getBootstrap themselves and surface the error through their own boundaries.
    return "theme"
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const themeStorageKey = await getThemeStorageKey()

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable,
        robotoHeading.variable
      )}
    >
      <body>
        <QueryProvider>
          {/* Keyed so switching accounts remounts the provider and re-reads the new key. */}
          <ThemeProvider key={themeStorageKey} storageKey={themeStorageKey}>
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
