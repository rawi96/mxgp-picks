import CredentialsProvider from 'next-auth/providers/credentials';
import { comparePasswords } from '../../../lib/bcrypt';

import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import prisma from '../../../lib/prisma';

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
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });
          if (user && (await comparePasswords(credentials.password, user.password))) {
            return user;
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
};
