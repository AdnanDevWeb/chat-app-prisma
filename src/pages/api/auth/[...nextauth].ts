import { prisma } from "@/lib/db"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { User } from "@prisma/client"
import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"




export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env!.GITHUB_ID as string,
      clientSecret: process.env!.GITHUB_SECRET as string,
    }),
    GoogleProvider({
        clientId: process.env!.GOOGLE_ID as string,
        clientSecret: process.env!.GOOGLE_SECRET as string,
      }),
  ],
  pages: {
    signIn: '/signin'
  },

  callbacks: {
    async session({session, user, token}){
      const userData = await prisma.user.findUnique({
          where: { id: user.id },
      }) as User

      if(session){
          session.user.id = user.id
      }
      return session
    }
  }
}

export default NextAuth(authOptions)