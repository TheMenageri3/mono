import NextAuth, { DefaultSession, type AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "../db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { verifyUserCredentials } from "./actions";

// Extending the Session.user object to include id
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" as const },
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.

      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const result = await verifyUserCredentials(
            credentials.email as string,
            credentials.password as string
          );

          // If verification was successful, return user data
          if (result.success) {
            return result.data;
          }

          return null;
        } catch (error) {
          console.error("Error in authorize:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
export const { auth, signIn, signOut } = NextAuth(authOptions);
