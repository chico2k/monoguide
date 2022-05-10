import { datatype, lorem, date } from 'faker';
import type { Vita } from '@prisma/client';

/**
 * Generates Vita Test Data
 */
export class VitaTestFactory {
  private vitas: Vita[];

  constructor() {
    this.vitas = this.vitaTestDataCreation();
  }

  /**
   * Generate data to create a new Database vita *
   * @param userId - optional
   * @returns
   */
  getVitaCreateData = (userId?: string) => {
    // TODO : Add Faker for dynamic Date
    const toDate = [new Date('2021-04-01T00:00:00.000Z'), null];
    const fromDate = new Date('2021-04-01T00:00:00.000Z');

    return {
      userId: userId || datatype.uuid(),
      title: lorem.words(5),
      text: lorem.sentences(5),
      fromDate,
      toDate: toDate[datatype.number(1)],
      isCurrent: true
    };
  };

  /**
   * Generate a List of Vitas for a User
   *
   * @returns a list of Database Vitas mapped to the Prisma Database Structure
   */
  getvitaTestData = () => this.vitas;

  private vitaTestDataCreation = (): Vita[] => {
    const vitas: Vita[] = [];

    const maxVita = 3;

    const userId = datatype.uuid();

    const toDate = [date.past(), null];

    for (let i = 0; i < maxVita; i += 1) {
      const vita: Vita = {
        id: datatype.number(999),
        createdAt: new Date(),
        updatedAt: new Date(),
        title: lorem.words(5),
        text: lorem.sentences(5),
        fromDate: date.past(),
        toDate: toDate[datatype.number(1)],
        isCurrent: true,
        userId,
        isPublished: datatype.boolean()
      };

      vitas.push(vita);
    }
    return vitas;
  };
}
