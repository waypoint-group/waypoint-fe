import { NextResponse } from "next/server"
import { getAccessToken } from "@/lib/auth-token"

export const GET = async () => {
  const accessToken = await getAccessToken()

  if (!accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const response = await fetch(`${process.env.BACKEND_URL}/api/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  const data = await response.json()

  return NextResponse.json(data, {
    status: response.status,
  })
}
