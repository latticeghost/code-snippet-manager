import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  // 1. Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign-in form (e.g., "Sign in with...")
      name: 'Credentials',
      
      credentials: {
        // We'll use a simple password
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // This is where we'd check a database, but we'll use a simple .env variable
        
        // We'll set this password in our .env file in the next step
        if (credentials.password === process.env.ADMIN_PASSWORD) {
          return { id: '1', name: 'Admin' };
        } else {
          // If you return null, an error will be displayed
          return null;
        }
      },
    }),
  ],
  
  session: {
    strategy: 'jwt',
  },

  pages: {
    signIn: '/login',
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };