import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import UserRepo from '../../../lib/repos/userRepo';
import EmailService from '../../../lib/services/emailService';
import UserService from '../../../lib/services/userService';
import prisma from '../../../lib/utils/prisma';

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);

const userService = new UserService(
  new UserRepo(prisma),
  new EmailService(require('@sendgrid/mail').setApiKey(process.env.SENDGRID_API_KEY))
);

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
      return await userService.createCustomSession(session);
    },
  },
};

export default authHandler;
