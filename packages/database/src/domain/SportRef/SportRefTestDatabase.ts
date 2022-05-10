import type { SportRef } from '@prisma/client';
import { SportRefTestFactory } from './SportRefTestFactory';
import type { ISportRefDatabase } from './types';

export class SportRefTestDatabase implements ISportRefDatabase {
  private sportRefs: SportRef[];

  constructor(sportRefs: SportRef[] = []) {
    this.sportRefs = sportRefs;
  }

  getSportRefUser = async (userId: string) => {
    const factory = new SportRefTestFactory().getSportRefTestData();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.sportRefs[userId] = factory;

    return factory;
  };
}
