import NextAuth from "next-auth"
import "next-auth/jwt"

import type { NextAuthConfig } from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from "axios"
import useProfileStore from "./store/profileStore";
const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

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
          const user = response.data["user"];
          console.log("authorize user2 :", user )
          if (user) {
            return { ...user, name: user?.name, accessToken: user?.token };
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
    jwt({ token, trigger, session, user }) {
      if (user) {
        token.accessToken = (user as any).accessToken;
      }
      if (trigger === "update") token.name = session.user.name;
      return token;
    },
    session({ session, token }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken as string;
      }
      return session;
    }
  },
  debug: process.env.NODE_ENV !== "production" ? true : false,
  trustHost: true,
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
