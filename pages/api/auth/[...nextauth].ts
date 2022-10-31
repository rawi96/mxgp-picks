import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { comparePasswords } from '../../../lib/bcrypt';
import prisma from '../../../lib/prisma';
import UserRepo from '../../../lib/repos/userRepo';

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email address', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials?: { email: string; password: string }) {
        if (!credentials) {
          return null;
        }
        const userRepo = new UserRepo(prisma);
        try {
          const user = await userRepo.getByEmail(credentials.email);
          if (user && (await comparePasswords(credentials.password, user.password))) {
            return { id: user.id, email: user.email, username: user.username, isAdmin: user.isAdmin };
          } else {
            return null;
          }
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  secret: process.env.SECRET,
  callbacks: {
    async session({ session }: { session: any }) {
      const userRepo = new UserRepo(prisma);
      const user = await userRepo.getByEmail(session.user.email);
      session = {
        ...session,
        user: {
          ...session.user,
          id: user?.id,
          username: user?.username,
          isAdmin: user?.isAdmin,
        },
      };

      return session;
    },
  },
};
