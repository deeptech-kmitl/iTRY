import NextAuth from "next-auth/next";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google"
import FacebookProvider, { FacebookProfile } from "next-auth/providers/facebook"
import { createUser, findUser } from "../../users/route";
import { AuthOptions, User } from "next-auth";

const signIn = async (profile: GoogleProfile | FacebookProfile) => {
  const { email } = profile
  try {
    const userData = await findUser(email);
    if (userData?.data) {
      const profileUser = userData?.data as User
      return profileUser
    } else {
      const insertUser = await createUser(profile);
      const profileUser = insertUser?.data as User
      return profileUser
    }
  } catch (error) {
    return error;
  }
}

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ?? "",
      async profile(profile: GoogleProfile) {
        try {
          const result = await signIn(profile)
          return result as User;
        } catch (error) {
          throw error;
        }
      }
    }),
    FacebookProvider({
      clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET ?? "",
      async profile(profile: FacebookProfile) {
        try {
          const result = await signIn(profile)
          return result as User;
        } catch (error) {
          throw error;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return { ...token, ...session.user }
      }
      if (user) {
        token.role = user.role
        token.email = user.email
        token.id = user.id
        token.notifications = user.notifications
        token.activitiesFollow = user.activitiesFollow
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role
        session.user.email = token.email
        session.user.id = token.id
        session.user.notifications = token.notifications
        session.user.activitiesFollow = token.activitiesFollow
      }
      return session
    }
  },
  pages: {
    signIn: "/?signIn=true"
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
export const { auth } = handler