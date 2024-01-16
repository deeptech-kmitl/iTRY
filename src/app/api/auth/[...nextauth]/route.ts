import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import CredentialsProvider from "next-auth/providers/credentials"
import { UserData } from "@/app/components/Navbar/navbar.d";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID ?? "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? "",
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
        const user = { id: '1', name: 'J Smith', email: 'test@example.com' };
        return user
      }
    })
  ],
  pages: {
    signIn: "auth/signin",
    // error: "/auth/error",
    // signOut: "/auth/signOut"
  }
})

export { handler as GET, handler as POST }