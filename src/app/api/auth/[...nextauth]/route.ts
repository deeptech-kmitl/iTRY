import NextAuth from "next-auth/next";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google"
import FacebookProvider, { FacebookProfile } from "next-auth/providers/facebook"
import CredentialsProvider from "next-auth/providers/credentials";
import { createUser, findUser, verifyPassword } from "../../users/route";
import { AuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import  Swal  from 'sweetalert2';

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
    throw error;
  }
}

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        console.log("test")
        if (!credentials?.email || !credentials?.password) return null;

        console.log("credentials", credentials)

        const user = await findUser(credentials?.email)

        console.log("user.data", user.data)

        if (user.data) {

            console.log('has user')
          // Any object returned will be saved in `user` property of the JWT
            console.log("password", credentials?.password, user.data.password)
            if (await verifyPassword(credentials?.password, user.data.password)) {
              return user.data as User
            }
          
            throw new Error('รหัสผานผิดพลาด')

          } else {
            console.log('no user')
            // If you return null then an error will be displayed advising the user to check their details.
             throw new Error('ไม่พบผู้ใช้งาน')

            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          }
      }
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      async profile(profile: GoogleProfile) {
        try {
          const result = await signIn(profile)
          return result as User;
        } catch (error) {
          throw error;
        }
      },
    }),
    FacebookProvider({
      clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID ?? "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? "",
      async profile(profile: FacebookProfile) {
        try {
          const result = await signIn(profile)
          return result as User;
        } catch (error) {
          throw error;
        }
      },
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
        token.receiveEmail = user.receiveEmail
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
        session.user.receiveEmail = token.receiveEmail
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