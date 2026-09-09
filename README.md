# Waypoint frontend

Waypoint frontend - a Next.js (App Router) application using shadcn/ui and next-auth.

## Tech stack

- Next.js (App Router)
- React 19
- Tailwind CSS v4
- shadcn/ui + Base UI
- Auth.js (next-auth) with Keycloak provider
- Storybook
- Vitest

## Prerequisites

- Bun

## Setup

1. Install dependencies:

   ```bash
   bun install
   ```

2. Copy the example environment file and fill in the values:

   ```bash
   cp .env.example .env.local
   ```

   Required environment variables:

   | Variable               | Description                            |
   | ---------------------- | -------------------------------------- |
   | `AUTH_SECRET`          | Secret used by Auth.js to sign tokens  |
   | `AUTH_KEYCLOAK_ID`     | Keycloak client ID                     |
   | `AUTH_KEYCLOAK_SECRET` | Keycloak client secret                 |
   | `AUTH_KEYCLOAK_ISSUER` | Keycloak issuer URL                    |
   | `AUTH_URL`             | Base URL of this app (used by Auth.js) |

3. Start the dev server:

   ```bash
   bun run dev
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000).

## Available commands

| Command                   | Description                                 |
| ------------------------- | ------------------------------------------- |
| `bun run dev`             | Start the Next.js dev server                |
| `bun run build`           | Build the app for production                |
| `bun run start`           | Run the production build                    |
| `bun run lint`            | Lint the codebase with ESLint               |
| `bun run format`          | Format the codebase with Prettier           |
| `bun run typecheck`       | Type-check the codebase with `tsc --noEmit` |
| `bun run storybook`       | Start Storybook on port 6006                |
| `bun run build-storybook` | Build a static Storybook site               |
