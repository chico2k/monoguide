import { PrismaClient } from '@prisma/client';
import { sportRefSeed } from './data/sportRef';
import { tagRefs } from './data/tagRefs';

const prisma = new PrismaClient();

const main = async () => {
  await prisma.sportRef.createMany({ data: sportRefSeed });
  await prisma.tagRef.createMany({ data: tagRefs });
};

main().catch((e) => console.error(e));
