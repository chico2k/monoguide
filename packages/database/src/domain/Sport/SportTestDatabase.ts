import { produce } from 'immer';
import { datatype } from 'faker';
import type { SportRef } from '@prisma/client';
import type { ISportWithSportRef, ISportDatabase } from '.';
import { SportRefTestFactory } from '../SportRef';

export class SportTestDatabase implements ISportDatabase {
  private sports: ISportWithSportRef[];

  private sportRefs: SportRef[];

  constructor(sports: ISportWithSportRef[] = []) {
    this.sports = sports;

    const sportRefFactory = new SportRefTestFactory();
    this.sportRefs = sportRefFactory.getSportRefTestData();
  }

  getSports = () => this.sports;

  createSport = async ({
    level,
    sportRefId,
    userId
  }: {
    level: number;
    sportRefId: number;
    userId: string;
  }): Promise<ISportWithSportRef> => {
    const sportRefIdIndex = this.sportRefs.findIndex(
      (sportRef) => sportRef.id === sportRefId
    );

    if (sportRefIdIndex === -1) throw Error('Provide a valid SportRefId');

    const newSport = {
      id: datatype.number(),
      level,
      userId,
      sportRefId,
      sportRef: this.sportRefs[sportRefIdIndex],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const newSportList = produce(this.sports, (draft) => {
      draft.push(newSport);
    });

    this.sports = newSportList;
    return newSport;
  };

  getSportDetail = async (sportId: number): Promise<ISportWithSportRef> => {
    const sportDetail = this.sports.find((sport) => sport.id === sportId);
    return sportDetail as ISportWithSportRef;
  };

  checkSportExists = async ({
    sportRefId,
    userId
  }: {
    sportRefId: number;
    userId: string;
  }): Promise<boolean> => {
    const index = this.sports.findIndex(
      (sport) => sport.sportRefId === sportRefId && sport.userId === userId
    );

    if (index !== -1) return true;
    return false;
  };

  deleteSport = async (sportId: number): Promise<boolean> => {
    try {
      this.sports = produce(this.sports, (draft) => {
        const index = draft.findIndex((sport) => sport.id === sportId);
        draft.splice(index, 1);
      });

      return true;
    } catch (error) {
      return false;
    }
  };

  updateSport = async ({
    sportId,
    level
  }: {
    level: number;
    sportId: number;
  }): Promise<ISportWithSportRef> => {
    this.sports = produce(this.sports, (draft) => {
      const index = draft.findIndex((sport) => sport.id === sportId);
      if (index !== -1) draft[index].level = level;
    });
    const updatedSportIndex = this.sports.findIndex(
      (sport) => sport.id === sportId
    );

    return this.sports[updatedSportIndex];
  };
}
