import NextAuth from "next-auth/next";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google"
import FacebookProvider, { FacebookProfile } from "next-auth/providers/facebook"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ?? "",
      profile(profile: GoogleProfile) {
        return {
          ...profile,
          role: "admin",
          id: "1"
        }
      }
    }),
    FacebookProvider({
      clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET ?? "",
      profile(profile: FacebookProfile) {
        return {
          ...profile,
          role: "admin",
          id: "1"
        }
      }
    }),
    CredentialsProvider({
      name: "credentials",
      "credentials": {
        email: {
          label: "Email",
          type: "email",
          placeholder: "test@example.com"
        },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credential, req) => {
        const { email, password } = credential as {
          email: string;
          password: string;
        };
        console.log(email, password)
        if (email !== "wavezaza2@outlook.com") {
          console.log("ERROR")
          throw new Error("Invalid credentials")
        }
        const user = { id: '1', name: 'J Smith', email: 'test@example.com', role: "admin" };
        return user
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role
      return token
    },
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role
      return session
    }
  },
  pages: {
    signIn: "/?signIn=true"
  }
})

export { handler as GET, handler as POST }