import NextAuth from "next-auth"
import Keycloak from "next-auth/providers/keycloak"
import { refreshAccessToken } from "./lib/auth/refresh-access-token"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Keycloak({
      clientId: process.env.AUTH_KEYCLOAK_ID!,
      clientSecret: process.env.AUTH_KEYCLOAK_SECRET!,
      issuer: process.env.AUTH_KEYCLOAK_ISSUER!,
    }),
  ],

  callbacks: {
    async jwt({ token, account }) {
      // Initial sign in
      if (account?.provider === "keycloak") {
        token.idToken = account.id_token
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
        token.accessTokenExpiresAt = account.expires_at
          ? account.expires_at * 1000
          : Date.now() + account.expires_in! * 1000

        return token
      }

      // Access token is still valid
      if (
        token.accessToken &&
        token.accessTokenExpiresAt &&
        Date.now() < token.accessTokenExpiresAt
      ) {
        return token
      }

      if (!token.refreshToken) {
        return {
          ...token,
          error: "RefreshAccessTokenError",
        }
      }

      // Access token expired
      return refreshAccessToken(token)
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken
      session.error = token.error

      return session
    },
  },
})
