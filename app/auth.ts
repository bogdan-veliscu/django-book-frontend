import NextAuth from "next-auth"
import "next-auth/jwt"

import type { NextAuthConfig } from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from "axios"
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const config = {
  theme: { logo: "/logo.png" },
  providers: [

      CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'Your username' },
        password: { label: 'Password', type: 'password', placeholder: 'Your password' },
      },
      async authorize(credentials) {
        try {
          const response = await axios.post(`${API_URL}/users/login/`, {
            user: {
                email: credentials?.username,
                password: credentials?.password,
            }
          });
          const user = response.data;
          if (user) {
            return { ...user.user, username: user?.name };
          } else {
            return null;
          }
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
      },
    }),
  ],
  basePath: "/auth",
  session: { strategy: "jwt" },
  callbacks: {
    jwt({ token, trigger, session }) {
      if (trigger === "update") token.name = session.user.name
      return token
    },
    async session({ session, token }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken
      }
      return session
    },
  },
  debug: process.env.NODE_ENV !== "production" ? true : false,
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)

declare module "next-auth" {
  interface Session {
    accessToken?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
  }
}
