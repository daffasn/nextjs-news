import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import { signInSchema } from "@/lib/zod"
import bcryptjs from "bcryptjs"
import { PrismaAdapter } from "@auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
          }),
          CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" },
            },
            async authorize (credentials) {
                let user = null
    
                const parsedCredentials = signInSchema.safeParse(credentials)

                if (!parsedCredentials.success) {
                    console.error("Invalid Credentials:", parsedCredentials.error.errors)
                }
    
                user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })
    
                if (!user) {
                    console.log("Invalid credentials");
                    return null;
                }
    
                if (!user.password) {
                    console.log("User has no password. They probably signed up with an oauth provider.");
                    return null;
                }
    
                const isPasswordValid = await bcryptjs.compare(credentials.password, user.password);
                if (!isPasswordValid) {
                    console.log("Invalid password");
                    return null;
                }
    
                const { password, ...userWithoutPassword } = user;
                return userWithoutPassword;
            }
        }),
    ],
    callbacks: {
        async jwt({ token, user, trigger, session, account }) {
          // console.log('THE USER IS', user);
          // console.log('THE ACCOUNT IS', account);
          
          if (trigger === "update" && session?.name || session?.email) {
            token.name = session.name
            token.email = session.email
            token.picture = session.image
          }

          if (user) {
            return {
                ...token,
                id: user.id,
                type: account.type,
                provider: account.provider,
            }
          }

          return token
        },
        async session({ session, user, token }) {
            // console.log('THE SESSION:', {session, user, token})

            return {
              ...session,
              user: {
                ...session.user,
                id: token.id,
                name: token.name,
                email: token.email,
                image: token.picture,
                type: token.type,
                provider: token.provider,
              }
            }
        }
    },
    session: {
      strategy: 'jwt'
    },
    pages: {
        signIn: "/auth/signin"
    },
    secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}