import { Logger } from '@sportsguide/lib';
import type { ISportDatabase, ISportWithSportRef } from '.';
import prismaClient from '../../lib/prisma';

class SportDatabase implements ISportDatabase {
  createSport = async ({
    level,
    sportRefId,
    userId
  }: {
    level: number;
    sportRefId: number;
    userId: string;
  }): Promise<ISportWithSportRef> => {
    try {
      const sport = await prismaClient.sport.create({
        include: {
          sportRef: true
        },
        data: {
          level,
          sportRefId,
          userId
        }
      });

      return sport;
    } catch (error) {
      Logger.error('error', error);
      throw error;
    }
  };

  getSportDetail = async (
    sportId: number
  ): Promise<ISportWithSportRef | null> => {
    try {
      const sport = await prismaClient.sport.findUnique({
        where: { id: sportId },
        include: { sportRef: true }
      });
      return sport;
    } catch (error) {
      Logger.error('error', error);
      throw error;
    }
  };

  checkSportExists = async ({
    sportRefId,
    userId
  }: {
    sportRefId: number;
    userId: string;
  }): Promise<boolean> => {
    try {
      const sport = await prismaClient.sport.findFirst({
        where: {
          userId,
          sportRefId
        },
        include: {
          sportRef: true
        }
      });

      if (sport) return true;
      return false;
    } catch (error) {
      Logger.error('error', error);
      throw error;
    }
  };

  deleteSport = async (sportId: number): Promise<boolean> => {
    try {
      await prismaClient.sport.delete({ where: { id: sportId } });
      return true;
    } catch (error) {
      Logger.error('error', error);
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
    try {
      return await prismaClient.sport.update({
        data: {
          level
        },
        where: {
          id: sportId
        },
        include: {
          sportRef: true
        }
      });
    } catch (error) {
      Logger.error('error', error);
      throw error;
    }
  };
}

export { SportDatabase };
