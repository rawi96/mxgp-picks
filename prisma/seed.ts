import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { Race, Rider, User } from '../src/lib/types/types';
import { hashPassword } from '../src/lib/utils/bcrypt';

const prisma = new PrismaClient();

async function main() {
  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD || !process.env.ADMIN_USERNAME) {
    throw Error('Missing ENV Vars for Admin User');
  }

  await prisma.result.deleteMany({});
  await prisma.rider.deleteMany({});
  await prisma.raceResult.deleteMany({});
  await prisma.race.deleteMany({});
  await prisma.pick.deleteMany({});
  await prisma.user.deleteMany({});

  const admin: User = {
    id: uuidv4(),
    username: process.env.ADMIN_USERNAME,
    email: process.env.ADMIN_EMAIL,
    password: await hashPassword(process.env.ADMIN_PASSWORD),
    isAdmin: true,
    score: 0,
    scorePerRace: null,
    isVerified: true,
    verifyToken: null,
    resetPasswordToken: null,
  };

  const roesti: User = {
    id: uuidv4(),
    username: 'Rösti2000',
    email: 'rösti@gmail.com',
    password: await hashPassword('1234qwerASDF'),
    isAdmin: false,
    score: 0,
    scorePerRace: null,
    isVerified: false,
    verifyToken: null,
    resetPasswordToken: null,
  };

  const skaterboy: User = {
    id: uuidv4(),
    username: 'Skaterboy_96',
    email: 'skaterboy@gmail.com',
    password: await hashPassword('1234qwerASDF'),
    isAdmin: false,
    score: 0,
    scorePerRace: null,
    isVerified: false,
    verifyToken: null,
    resetPasswordToken: null,
  };

  const beautyQueen: User = {
    id: uuidv4(),
    username: 'BeautyQueen_04',
    email: 'beautyqueen@gmail.com',
    password: await hashPassword('1234qwerASDF'),
    isAdmin: false,
    score: 0,
    scorePerRace: null,
    isVerified: false,
    verifyToken: null,
    resetPasswordToken: null,
  };

  const schuegaKing: User = {
    id: uuidv4(),
    username: 'SchügaKing_99',
    email: 'schügaking@gmail.com',
    password: await hashPassword('1234qwerASDF'),
    isAdmin: false,
    score: 0,
    scorePerRace: null,
    isVerified: false,
    verifyToken: null,
    resetPasswordToken: null,
  };

  const ironman: User = {
    id: uuidv4(),
    username: 'Ironman_69',
    email: 'ironman@gmail.com',
    password: await hashPassword('1234qwerASDF'),
    isAdmin: false,
    score: 0,
    scorePerRace: null,
    isVerified: false,
    verifyToken: null,
    resetPasswordToken: null,
  };

  const seewer: Rider = {
    id: uuidv4(),
    firstname: 'Jeremy',
    lastname: 'Seewer',
    numberplate: 91,
  };

  const gajser: Rider = {
    id: uuidv4(),
    firstname: 'Tim',
    lastname: 'Gajser',
    numberplate: 243,
  };

  const prado: Rider = {
    id: uuidv4(),
    firstname: 'Jorge',
    lastname: 'Prado',
    numberplate: 61,
  };

  const coldenhoff: Rider = {
    id: uuidv4(),
    firstname: 'Glen',
    lastname: 'Coldenhoff',
    numberplate: 259,
  };

  const renaux: Rider = {
    id: uuidv4(),
    firstname: 'Maxime',
    lastname: 'Renaux',
    numberplate: 959,
  };

  const fernandez: Rider = {
    id: uuidv4(),
    firstname: 'Ruben',
    lastname: 'Fernandez',
    numberplate: 70,
  };

  const Jonass: Rider = {
    id: uuidv4(),
    firstname: 'Pauls',
    lastname: 'Jonass',
    numberplate: 41,
  };

  const argentina: Race = {
    id: uuidv4(),
    title: 'MXGP of Patagonia Argentina',
    date: new Date('2022-10-25'),
    factor: 1,
    wildcardPos: 10,
  };

  const trentino: Race = {
    id: uuidv4(),
    title: 'MXGP of Trentino',
    date: new Date('2022-11-11'),
    factor: 1,
    wildcardPos: 14,
  };

  const portugal: Race = {
    id: uuidv4(),
    title: 'MXGP of Portugal',
    date: new Date('2023-04-30'),
    factor: 1,
    wildcardPos: 8,
  };

  const spain: Race = {
    id: uuidv4(),
    title: 'MXGP of Spain',
    date: new Date('2023-05-07'),
    factor: 1,
    wildcardPos: 11,
  };

  const france: Race = {
    id: uuidv4(),
    title: 'MXGP of France',
    date: new Date('2023-05-21'),
    factor: 1,
    wildcardPos: 11,
  };

  const resultAdminArgentina = {
    id: uuidv4(),
    firstId: gajser.id,
    secondId: seewer.id,
    thirdId: prado.id,
    fourthId: coldenhoff.id,
    fifthId: renaux.id,
    wildcardId: fernandez.id,
  };

  const resultAdminTrentino = {
    id: uuidv4(),
    firstId: seewer.id,
    secondId: gajser.id,
    thirdId: renaux.id,
    fourthId: coldenhoff.id,
    fifthId: fernandez.id,
    wildcardId: Jonass.id,
  };

  const resultAdminPortugal = {
    id: uuidv4(),
    firstId: coldenhoff.id,
    secondId: seewer.id,
    thirdId: prado.id,
    fourthId: gajser.id,
    fifthId: renaux.id,
    wildcardId: fernandez.id,
  };

  const resultRoestiArgentina = {
    id: uuidv4(),
    firstId: gajser.id,
    secondId: seewer.id,
    thirdId: prado.id,
    fourthId: coldenhoff.id,
    fifthId: renaux.id,
    wildcardId: fernandez.id,
  };

  const resultRoestiTrentino = {
    id: uuidv4(),
    firstId: fernandez.id,
    secondId: renaux.id,
    thirdId: gajser.id,
    fourthId: coldenhoff.id,
    fifthId: seewer.id,
    wildcardId: Jonass.id,
  };

  const resultSkaterboyArgentina = {
    id: uuidv4(),
    firstId: gajser.id,
    secondId: seewer.id,
    thirdId: prado.id,
    fourthId: coldenhoff.id,
    fifthId: renaux.id,
    wildcardId: fernandez.id,
  };

  const resultSkaterboyTrentino = {
    id: uuidv4(),
    firstId: Jonass.id,
    secondId: gajser.id,
    thirdId: renaux.id,
    fourthId: coldenhoff.id,
    fifthId: fernandez.id,
    wildcardId: seewer.id,
  };

  const resultSkaterboyPortugal = {
    id: uuidv4(),
    firstId: coldenhoff.id,
    secondId: renaux.id,
    thirdId: prado.id,
    fourthId: gajser.id,
    fifthId: seewer.id,
    wildcardId: fernandez.id,
  };

  const resultBeautyQueenTrentino = {
    id: uuidv4(),
    firstId: Jonass.id,
    secondId: gajser.id,
    thirdId: renaux.id,
    fourthId: coldenhoff.id,
    fifthId: fernandez.id,
    wildcardId: seewer.id,
  };

  const pickAdminArgentina = {
    id: uuidv4(),
    userId: admin.id,
    raceId: argentina.id,
    resultId: resultAdminArgentina.id,
  };

  const pickAdminTrentino = {
    id: uuidv4(),
    userId: admin.id,
    raceId: trentino.id,
    resultId: resultAdminTrentino.id,
  };

  const pickAdminPortugal = {
    id: uuidv4(),
    userId: admin.id,
    raceId: portugal.id,
    resultId: resultAdminPortugal.id,
  };

  const pickRoestiArgentina = {
    id: uuidv4(),
    userId: roesti.id,
    raceId: argentina.id,
    resultId: resultRoestiArgentina.id,
  };

  const pickRoestiTrentino = {
    id: uuidv4(),
    userId: roesti.id,
    raceId: trentino.id,
    resultId: resultRoestiTrentino.id,
  };

  const pickSkaterboyArgentina = {
    id: uuidv4(),
    userId: skaterboy.id,
    raceId: argentina.id,
    resultId: resultSkaterboyArgentina.id,
  };

  const pickSkaterboyTrentino = {
    id: uuidv4(),
    userId: skaterboy.id,
    raceId: trentino.id,
    resultId: resultSkaterboyTrentino.id,
  };

  const pickSkaterboyPortugal = {
    id: uuidv4(),
    userId: skaterboy.id,
    raceId: portugal.id,
    resultId: resultSkaterboyPortugal.id,
  };

  const pickBeautyQueenTrentino = {
    id: uuidv4(),
    userId: beautyQueen.id,
    raceId: trentino.id,
    resultId: resultBeautyQueenTrentino.id,
  };

  const argentinaResult = {
    id: uuidv4(),
    firstId: gajser.id,
    secondId: seewer.id,
    thirdId: prado.id,
    fourthId: coldenhoff.id,
    fifthId: renaux.id,
    wildcardId: fernandez.id,
  };

  const trentinoResult = {
    id: uuidv4(),
    firstId: Jonass.id,
    secondId: gajser.id,
    thirdId: renaux.id,
    fourthId: coldenhoff.id,
    fifthId: fernandez.id,
    wildcardId: seewer.id,
  };

  const portugalResult = {
    id: uuidv4(),
    firstId: coldenhoff.id,
    secondId: renaux.id,
    thirdId: prado.id,
    fourthId: gajser.id,
    fifthId: seewer.id,
    wildcardId: fernandez.id,
  };

  const argentinaRaceResult = {
    id: uuidv4(),
    raceId: argentina.id,
    resultId: argentinaResult.id,
  };

  const trentinoRaceResult = {
    id: uuidv4(),
    raceId: trentino.id,
    resultId: trentinoResult.id,
  };

  const portugalRaceResult = {
    id: uuidv4(),
    raceId: portugal.id,
    resultId: portugalResult.id,
  };

  await prisma.user.createMany({
    data: [admin, roesti, skaterboy, beautyQueen, ironman, schuegaKing],
    skipDuplicates: true,
  });

  await prisma.rider.createMany({
    data: [seewer, gajser, prado, coldenhoff, renaux, fernandez, Jonass],
    skipDuplicates: true,
  });

  await prisma.race.createMany({
    data: [argentina, trentino, portugal, spain, france],
    skipDuplicates: true,
  });

  await prisma.result.createMany({
    data: [
      resultAdminArgentina,
      resultAdminTrentino,
      resultAdminPortugal,
      resultRoestiArgentina,
      resultRoestiTrentino,
      resultSkaterboyArgentina,
      resultSkaterboyTrentino,
      resultSkaterboyPortugal,
      resultBeautyQueenTrentino,
      argentinaResult,
      trentinoResult,
      portugalResult,
    ],
    skipDuplicates: true,
  });

  await prisma.pick.createMany({
    data: [
      pickAdminArgentina,
      pickAdminTrentino,
      pickAdminPortugal,
      pickRoestiArgentina,
      pickRoestiTrentino,
      pickSkaterboyArgentina,
      pickSkaterboyTrentino,
      pickSkaterboyPortugal,
      pickBeautyQueenTrentino,
    ],
    skipDuplicates: true,
  });

  await prisma.raceResult.createMany({
    data: [argentinaRaceResult, trentinoRaceResult, portugalRaceResult],
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
