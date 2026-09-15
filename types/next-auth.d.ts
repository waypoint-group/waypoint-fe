import "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    accessToken?: string
    error?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    idToken?: string
    accessToken?: string
    refreshToken?: string
    accessTokenExpiresAt?: number
    error?: "RefreshAccessTokenError"
  }
}
