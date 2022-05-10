import { datatype, date } from 'faker';
import type { ISportWithSportRef } from './types';
import { SportRefTestFactory } from '../SportRef/SportRefTestFactory';

/**
 * SportTestFactory to create Sport Examples matching the Prisma Schema
 */
export class SportTestFactory {
  private sports: ISportWithSportRef[] = [];

  constructor() {
    this.sports = this.sportTestDataCreation();
  }

  /**
   * Provides a list of Sports with SportRefs for Testing
   *
   * @returns ISportWithSportRef[]
   */
  getSportTestData = (): ISportWithSportRef[] => this.sports;

  /**
   * Generate more Datbase Sport Test data
   */
  createMoreSports = (): void => {
    const moreSports = this.sportTestDataCreation();

    this.sports = [...this.sports, ...moreSports];
  };

  private sportTestDataCreation = (): ISportWithSportRef[] => {
    const sport: ISportWithSportRef[] = [];

    const maxSports = 5;

    const sportRefFactory = new SportRefTestFactory();
    const sportRefs = sportRefFactory.getSportRefTestData();

    const sortRefsLength = sportRefs.length;
    const randomSportRefIndex = datatype.number(sortRefsLength - 1);
    const userId = datatype.uuid();

    for (let i = 0; i < maxSports; i += 1) {
      const sportRefId = datatype.number(999);

      const sportItem: ISportWithSportRef = {
        id: datatype.number(999),
        level: datatype.number(3),
        userId,
        createdAt: date.past(),
        updatedAt: date.past(),
        sportRefId,
        sportRef: sportRefs[randomSportRefIndex]
      };
      sport.push(sportItem);
    }

    return sport;
  };
}
