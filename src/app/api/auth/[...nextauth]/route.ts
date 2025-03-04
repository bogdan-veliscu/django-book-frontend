import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authClient } from "../../../../../app/services/apiClient";

// Define the API URL based on environment
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://brandfocus.ai/api";

// Create a direct implementation of NextAuth
const handler = NextAuth({
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        domain: process.env.NODE_ENV === "production" ? ".brandfocus.ai" : undefined,
      },
    },
    callbackUrl: {
      name: `next-auth.callback-url`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        domain: process.env.NODE_ENV === "production" ? ".brandfocus.ai" : undefined,
      },
    },
    csrfToken: {
      name: `next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        domain: process.env.NODE_ENV === "production" ? ".brandfocus.ai" : undefined,
      },
    },
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
          email: token.email || "",
          token: token.token as string || "",
          username: token.username as string || "",
          bio: token.bio as string || "",
          image: token.image as string || null,
        };
        
        // Also set accessToken for easier access
        session.accessToken = token.token as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
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
          
          // Make a direct API call to the backend using authClient
          const response = await authClient.post(`/users/login`, {
            user: {
              email: credentials.email,
              password: credentials.password,
            }
          });
          
          if (!response.data.user) {
            console.error("Invalid response format:", response.data);
            return null;
          }
          
          const user = response.data.user;
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
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  // Disable the edge runtime for now to ensure compatibility
  // We can re-enable it later after confirming everything works
});

// Export the handler as GET and POST methods
export { handler as GET, handler as POST };

// Disable edge runtime until we confirm everything works
// export const runtime = "edge"; 