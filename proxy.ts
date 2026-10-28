import { NextResponse, type NextFetchEvent, type NextProxy } from "next/server"
import type { NextAuthRequest } from "next-auth"

import { auth } from "@/auth"

// Typed explicitly so auth() picks its proxy overload rather than the route handler one.
const continueRequest: (
  request: NextAuthRequest,
  event: NextFetchEvent
) => NextResponse = () => NextResponse.next()

// Auth.js's proxy wrapper decodes the session, runs the jwt callback (refreshing an expired
// access token) and returns the re-encoded session as Set-Cookie headers.
const runAuth = auth(continueRequest)

// Server Components can't set cookies, so a refresh done by auth() during render would be lost.
// Running Auth.js here persists rotated tokens to the browser and hands them to this request.
export const proxy: NextProxy = async (request, event) => {
  const authResponse = await runAuth(request, event)
  const setCookies = authResponse?.headers.getSetCookie() ?? []

  if (setCookies.length === 0) {
    return NextResponse.next()
  }

  // auth() in the render reads the raw Cookie header, so the new session must replace the old one
  // there too, or it would refresh again with the stale refresh token.
  for (const setCookie of setCookies) {
    const [pair] = setCookie.split(";")
    const separatorIndex = pair.indexOf("=")
    const name = pair.slice(0, separatorIndex)
    // Set-Cookie values arrive URL-encoded and cookies.set() encodes again, so decode first.
    const value = decodeURIComponent(pair.slice(separatorIndex + 1))

    // Auth.js clears stale session chunks by setting them to an empty value.
    if (value) {
      request.cookies.set(name, value)
    } else {
      request.cookies.delete(name)
    }
  }

  const response = NextResponse.next({ request: { headers: request.headers } })

  for (const setCookie of setCookies) {
    response.headers.append("set-cookie", setCookie)
  }

  return response
}

export const config = {
  // Skips Auth.js's own routes, which manage the session cookie themselves, and static assets.
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
}
