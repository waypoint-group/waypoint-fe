import { getToken } from "next-auth/jwt"
import { cookies } from "next/headers"

export const getAccessToken = async () => {
  const cookieStore = await cookies()

  const token = await getToken({
    req: new Request("http://localhost:3000", {
      headers: {
        cookie: cookieStore.toString(),
      },
    }),
    secret: process.env.AUTH_SECRET,
  })

  return token?.accessToken
}
