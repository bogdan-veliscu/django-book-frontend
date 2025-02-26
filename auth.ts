import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "./app/services/userService";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

// Define User interface locally
interface User {
  email: string;
  token: string;
  username: string;
  bio?: string;
  image?: string;
}

// Extend the built-in types
declare module "next-auth" {
  interface Session {
    user: User & {
      name?: string | null;
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT extends User {}
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        console.log("JWT callback with user:", user);
        return {
          ...token,
          ...(user as User),
        };
      }
      return token;
    },
    async session({ session, token }) {
      console.log("Session callback with token:", token);
      // Send properties to the client
      if (token) {
        session.user = {
          ...session.user,
          email: token.email || "",
          token: token.token || "",
          username: token.username || "",
          bio: token.bio || "",
          // Convert any non-string image value to null
          image: typeof token.image === 'string' ? token.image : null,
        };
      }
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.error("Missing credentials");
          return null;
        }

        try {
          console.log("Authorizing with credentials:", credentials.email);
          const user = await loginUser({
            email: credentials.email as string,
            password: credentials.password as string,
          });

          console.log("User authorized:", user);
          return user as any;
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
}); 