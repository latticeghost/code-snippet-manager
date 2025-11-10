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
        // This is where you'd check a database, but we'll use a simple .env variable
        
        // We'll set this password in our .env file in the next step
        if (credentials.password === process.env.ADMIN_PASSWORD) {
          // Any object returned here will be saved in the session
          return { id: '1', name: 'Admin' };
        } else {
          // If you return null, an error will be displayed
          return null;
        }
      },
    }),
  ],
  
  // 2. We are using a simple JWT strategy
  session: {
    strategy: 'jwt',
  },

  // 3. Define our simple login page
  pages: {
    signIn: '/login',
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };