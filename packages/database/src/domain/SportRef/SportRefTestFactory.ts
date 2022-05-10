import type { SportRef } from '@prisma/client';
import { sportRefSeed } from '../../../prisma/data/sportRef';

export class SportRefTestFactory {
  private sportRefTestData: SportRef[] = [];

  constructor() {
    this.sportRefTestData = this.sportRefTestDataCreation();
  }

  getSportRefTestData = () => this.sportRefTestData;

  private sportRefTestDataCreation = () =>
    sportRefSeed.map((sportRef) => {
      const creationDate = new Date();
      return {
        ...sportRef,
        createdAt: creationDate,
        updatedAt: creationDate
      };
    });
}
