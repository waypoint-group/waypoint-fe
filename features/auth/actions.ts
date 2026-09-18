"use server"

import { signOut } from "@/auth"
import { getToken } from "next-auth/jwt"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const logout = async () => {
  const cookieStore = await cookies()

  // getToken only reads req.headers, so the URL here is a placeholder, never fetched
  const token = await getToken({
    req: new Request("http://localhost:3000", {
      headers: {
        cookie: cookieStore.toString(),
      },
    }),
    secret: process.env.AUTH_SECRET,
  })

  await signOut({
    redirect: false,
  })

  if (!token?.idToken) {
    redirect("/")
  }

  const logoutUrl = new URL(
    `${process.env.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/logout`
  )

  logoutUrl.searchParams.set("id_token_hint", token.idToken)
  logoutUrl.searchParams.set(
    "post_logout_redirect_uri",
    process.env.AUTH_URL ?? "http://localhost:3000"
  )

  redirect(logoutUrl.toString())
}
