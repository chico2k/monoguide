import type { SportRef } from '@prisma/client';
import { Logger } from '@sportsguide/lib';
import prismaClient from '../../lib/prisma';
import type { ISportRefDatabase } from './types';

class SportRefDatabase implements ISportRefDatabase {
  getSportRefUser = async (userId: string): Promise<SportRef[]> => {
    try {
      return await prismaClient.sportRef.findMany({
        where: {
          sport: {
            none: {
              userId
            }
          }
        }
      });
    } catch (error) {
      Logger.error('error', error);
      throw error;
    }
  };
}

export { SportRefDatabase };
