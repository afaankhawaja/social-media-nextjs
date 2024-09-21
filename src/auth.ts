// import NextAuth from "next-auth"
// import GoogleProvider from "next-auth/providers/google"
// import { NextAuthConfig } from "next-auth"

// export const authConfig: NextAuthConfig = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
//   pages: {
//     signIn: '/auth/signin',
//   },
// }

// export const { 
//   handlers: { GET, POST },
//   auth,
//   signIn,
//   signOut,
// } = NextAuth(authConfig)

// // Add this type declaration
// declare module "next-auth" {
//   interface Session {
//     user?: {
//       id?: string
//       name?: string | null
//       email?: string | null
//       image?: string | null
//     }
//   }
// }
// import NextAuth from "next-auth"
// import GoogleProvider from "next-auth/providers/google"
// import { NextAuthConfig } from "next-auth"

// export const authConfig: NextAuthConfig = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
//   pages: {
//     signIn: '/auth/signin',
//   },
// }

// export const { 
//   handlers: { GET, POST },
//   auth,
//   signIn,
//   signOut,
// } = NextAuth(authConfig)

// // Add this line to export useSession
// export { useSession } from "next-auth/react"

// declare module "next-auth" {
//   interface Session {
//     user?: {
//       id?: string
//       name?: string | null
//       email?: string | null
//       image?: string | null
//     }
//   }
// }

// src/auth.ts
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
})

declare module "next-auth" {
  interface Session {
    user?: {
      id?: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
}