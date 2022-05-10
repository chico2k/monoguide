import type { TagRef } from '@prisma/client';
import { Logger } from '@sportsguide/lib';
import prismaClient from '../../lib/prisma';
import type { ITagRefDatabase } from './types';

class TagRefDatabase implements ITagRefDatabase {
  createTag = async ({ text }: { text: string }): Promise<TagRef> => {
    try {
      return await prismaClient.tagRef.create({ data: { text } });
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  };

  getTagList = async (): Promise<TagRef[]> => {
    try {
      return await prismaClient.tagRef.findMany();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  };
}

export { TagRefDatabase };
