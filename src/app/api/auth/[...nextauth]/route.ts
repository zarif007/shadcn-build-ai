import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { Session } from "next-auth";

// Extend the default session type to include id
interface ExtendedSession extends Session {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    // signOut: '/auth/signout',
    // error: '/auth/error',
  },
  callbacks: {
    async session({ session, token }): Promise<ExtendedSession> {
      // Send properties to the client, like an access_token and user id from a provider
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub as string,
        },
      } as ExtendedSession;
    },
    async jwt({ token, account }) {
      // Persist the OAuth access_token and or refresh token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };
