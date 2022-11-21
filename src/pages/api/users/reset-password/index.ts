import type { NextApiRequest, NextApiResponse } from 'next';
import UserRepo from '../../../../lib/repos/userRepo';
import EmailService from '../../../../lib/services/emailService';
import UserService from '../../../../lib/services/userService';
import prisma from '../../../../lib/utils/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  const userService = new UserService(
    new UserRepo(prisma),
    new EmailService(require('@sendgrid/mail').setApiKey(process.env.SENDGRID_API_KEY))
  );
  try {
    switch (method) {
      case 'POST':
        return await userService.resetPassword(req, res);
      default:
        return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default handler;
