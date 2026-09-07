import NextAuth from "next-auth"
import Keycloak from "next-auth/providers/keycloak"

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
      if (account?.provider === "keycloak") {
        token.idToken = account.id_token
        token.accessToken = account.access_token
      }

      return token
    },
  },
})
