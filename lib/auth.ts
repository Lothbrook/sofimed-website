import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { UserModel } from './models/user';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Mot de passe', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const user = await UserModel.verifyPassword(
            credentials.email,
            credentials.password
          );

          if (user) {
            return {
              id: user.id!.toString(),
              email: user.email,
              name: `${user.first_name} ${user.last_name}`.trim(),
              role: user.role,
              username: user.username
            };
          }
          return null;
        } catch (error) {
          console.error('Erreur d\'authentification:', error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.username = (user as any).username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        (session.user as any).id = token.sub;
        (session.user as any).role = token.role;
        (session.user as any).username = token.username;
      }
      return session;
    }
  },
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  // Ajoutez cette configuration pour éviter les redirections infinies
  debug: process.env.NODE_ENV === 'development',
};