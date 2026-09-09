import type { Preview } from "@storybook/nextjs-vite"

import "../app/globals.css"
import { DecoratorHelpers } from "@storybook/addon-themes"
import { ThemeProvider } from "../components/theme-provider"

const { initializeThemeState, pluckThemeFromContext } = DecoratorHelpers

initializeThemeState(["light", "dark"], "light")

const preview: Preview = {
  decorators: [
    (Story, context) => (
      <ThemeProvider
        enableSystem={false}
        forcedTheme={pluckThemeFromContext(context) || "light"}
      >
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
}

export default preview
