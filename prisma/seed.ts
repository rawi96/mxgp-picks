import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../src/lib/types/types';
import { hashPassword } from '../src/lib/utils/bcrypt';

const prisma = new PrismaClient();

async function main() {
  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD || !process.env.ADMIN_USERNAME) {
    throw Error('Missing ENV Vars for Admin User');
  }

  const admin: User = {
    id: uuidv4(),
    username: process.env.ADMIN_USERNAME,
    email: process.env.ADMIN_EMAIL,
    password: await hashPassword(process.env.ADMIN_PASSWORD),
    isAdmin: true,
    score: 0,
  };

  await prisma.user.createMany({
    data: admin,
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
