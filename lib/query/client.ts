import {
  QueryClient,
  defaultShouldDehydrateQuery,
  environmentManager,
} from "@tanstack/react-query"

import { ApiError } from "@/lib/api/error"

const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        // Keeps the client from immediately refetching data that was just server-rendered.
        staleTime: 30 * 1000,
        retry: (failureCount, error) => {
          if (error instanceof ApiError && error.status < 500) {
            return false
          }

          return failureCount < 3
        },
      },
      dehydrate: {
        // Lets a server-prefetched query stream to the client before it has resolved.
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
    },
  })

let browserQueryClient: QueryClient | undefined

export const getQueryClient = () => {
  // A server client must never be shared across requests; the browser one must never be recreated.
  if (environmentManager.isServer()) {
    return makeQueryClient()
  }

  browserQueryClient ??= makeQueryClient()

  return browserQueryClient
}
