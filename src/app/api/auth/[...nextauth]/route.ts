import NextAuth from "next-auth/next";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google"
import FacebookProvider, { FacebookProfile } from "next-auth/providers/facebook"
import CredentialsProvider from "next-auth/providers/credentials"
import { createUser, findUser } from "../../users/route";
import { User } from "next-auth";

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

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: (process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ? process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID : process.env.GOOGLE_CLIENT_ID) ?? "",
      clientSecret: (process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ? process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET : process.env.GOOGLE_CLIENT_SECRET) ?? "",
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
      clientId: (process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID ? process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID : process.env.FACEBOOK_CLIENT_ID) ?? "",
      clientSecret: (process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET ? process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET : process.env.FACEBOOK_CLIENT_SECRET) ?? "",
      async profile(profile: FacebookProfile) {
        try {
          const result = await signIn(profile)
          return result as User;
        } catch (error) {
          throw error;
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
        const user: User = { id: '1', name: 'J Smith', email: 'test@example.com', role: "admin", activitiesFollow:[], notifications: [] };
        return user
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return {...token, ...session.user}
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
})

export { handler as GET, handler as POST }