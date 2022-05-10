import { Logger } from '@sportsguide/lib';
import type { Vita } from '@prisma/client';
import prismaClient from '../../lib/prisma';
import type {
  IVitaCreateInput,
  IVitaDatabase,
  IVitaUpdateInput
} from './types';

class VitaDatabase implements IVitaDatabase {
  getVitaDetail = async (vitaId: number): Promise<Vita | null> => {
    try {
      return await prismaClient.vita.findUnique({
        where: {
          id: vitaId
        }
      });
    } catch (error) {
      Logger.error('error', error);
      throw error;
    }
  };

  getVitaList = async (userId: string): Promise<Vita[]> => {
    try {
      return await prismaClient.vita.findMany({
        where: {
          userId
        }
      });
    } catch (error) {
      Logger.error('error', error);
      throw error;
    }
  };

  deleteVita = async (vitaId: number): Promise<boolean> => {
    try {
      await prismaClient.vita.delete({
        where: {
          id: vitaId
        }
      });
      return true;
    } catch (error) {
      Logger.error('error', error);
      return false;
    }
  };

  updateVita = async ({
    id,
    userId,
    title,
    text,
    fromDate,
    toDate,
    isCurrent
  }: IVitaUpdateInput): Promise<Vita> => {
    try {
      return await prismaClient.vita.update({
        data: {
          id,
          userId,
          title,
          text,
          fromDate,
          toDate: toDate || undefined,
          isCurrent
        },

        where: {
          id
        }
      });
    } catch (error) {
      Logger.error('error', error);
      throw error;
    }
  };

  createVita = async ({
    userId,
    title,
    text,
    fromDate,
    toDate,
    isCurrent
  }: IVitaCreateInput): Promise<Vita> => {
    try {
      return await prismaClient.vita.create({
        data: {
          userId,
          title,
          text,
          fromDate,
          toDate,
          isCurrent
        }
      });
    } catch (error) {
      Logger.error('error', error);
      throw error;
    }
  };
}

export { VitaDatabase };
