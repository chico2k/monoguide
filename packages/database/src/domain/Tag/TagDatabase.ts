import { Logger } from '@sportsguide/lib';
import prismaClient from '../../lib/prisma';
import type { ITagDatabase, ITagWithTagRef } from '.';
import type { ICreateTagInput } from './types';

class TagDatabase implements ITagDatabase {
  createTag = async ({
    userId,
    tagRefId
  }: ICreateTagInput): Promise<ITagWithTagRef> =>
    prismaClient.tag.create({
      data: {
        userId,
        tagRefId
      },
      include: {
        tagRef: true
      }
    });

  checkTagExists = async (
    userId: string,
    tagRefId: number
  ): Promise<boolean> => {
    try {
      const tag = await prismaClient.tag.findFirst({
        where: {
          tagRefId,
          userId
        }
      });
      if (tag) return true;
      return false;
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  };

  getTagDetail = async (tagId: number): Promise<ITagWithTagRef> => {
    try {
      const tag = await prismaClient.tag.findFirst({
        where: {
          id: tagId
        },
        include: {
          tagRef: true
        }
      });
      if (!tag) throw new Error('TAG_USER_NOT_FOUND');

      return tag;
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  };

  getTagList = async ({
    userId
  }: {
    userId: string;
  }): Promise<ITagWithTagRef[]> => {
    try {
      return await prismaClient.tag.findMany({
        where: {
          userId
        },
        include: {
          tagRef: true
        }
      });
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  };

  deleteTag = async (tagId: number): Promise<boolean> => {
    try {
      await prismaClient.tag.delete({
        where: {
          id: tagId
        }
      });
      return true;
    } catch (error) {
      Logger.error(error);
      return false;
    }
  };
}

export { TagDatabase };
