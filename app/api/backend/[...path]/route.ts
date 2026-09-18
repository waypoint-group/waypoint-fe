import { NextResponse, type NextRequest } from "next/server"

import { BackendAuthError, backendFetch } from "@/lib/backend"

// Segments arrive URL-decoded, so an encoded "%2e%2e" or "%2f" could otherwise escape BACKEND_URL.
const isUnsafeSegment = (segment: string) =>
  segment === "" || segment === "." || segment === ".." || /[/\\]/.test(segment)

// Passes browser requests through to the backend with the Authorization header attached here,
// so no component has to read, refresh or hold the access token itself.
const handler = async (
  request: NextRequest,
  context: RouteContext<"/api/backend/[...path]">
) => {
  const { path } = await context.params

  if (path.some(isUnsafeSegment)) {
    return NextResponse.json({ message: "Invalid path" }, { status: 400 })
  }

  const { search } = new URL(request.url)
  const contentType = request.headers.get("content-type")
  // Collapses to undefined for bodyless requests, which fetch() requires for GET and HEAD.
  const body = (await request.text()) || undefined

  try {
    const response = await backendFetch(
      `/${path.map(encodeURIComponent).join("/")}${search}`,
      {
        method: request.method,
        headers: contentType ? { "content-type": contentType } : undefined,
        body,
      }
    )

    return new NextResponse(response.body, {
      status: response.status,
      headers: {
        "content-type":
          response.headers.get("content-type") ?? "application/json",
      },
    })
  } catch (error) {
    if (error instanceof BackendAuthError) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    throw error
  }
}

export {
  handler as GET,
  handler as POST,
  handler as PATCH,
  handler as PUT,
  handler as DELETE,
}
