import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import UserRepo from '../../../lib/repos/userRepo';
import UserService from '../../../lib/services/userService';
import prisma from '../../../lib/utils/prisma';

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
        const userService = new UserService(new UserRepo(prisma));
        try {
          return await userService.authorize(credentials.email, credentials.password);
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.SECRET,
  callbacks: {
    async session({ session }: { session: any }) {
      const userService = new UserService(new UserRepo(prisma));
      return await userService.createCustomSession(session);
    },
  },
};
