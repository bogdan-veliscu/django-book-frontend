import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "./app/services/userService";

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
    user: {
      name?: string | null;
      email?: string;
      image?: string | null;
      token?: string;
      username?: string;
      bio?: string;
    };
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    email?: string;
    token?: string;
    username?: string;
    bio?: string;
    image?: string;
  }
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
        // Cast user to any to avoid type errors
        const userData = user as any;
        
        // Update token with user data
        token.email = userData.email || token.email;
        token.token = userData.token || token.token;
        token.username = userData.username || token.username;
        token.bio = userData.bio || token.bio || "";
        token.image = userData.image || token.image;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("Session callback with token:", token);
      
      // Send properties to the client
      if (token) {
        // Update session with token data
        session.user = {
          ...session.user,
          email: token.email,
          token: token.token,
          username: token.username,
          bio: token.bio,
          image: token.image,
        };
        
        // Also set accessToken for easier access
        session.accessToken = token.token;
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
          return user;
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