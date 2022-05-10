import { Logger } from '@sportsguide/lib';
import type { ReviewMeta } from '@prisma/client';
import prismaClient from '../../lib/prisma';
import type { IUpdateRatingValuesInput, IReviewMetaDatabase } from './types';
import { ReviewMetaHelper } from './ReviewMetaHelper';

export class ReviewMetaDatabase implements IReviewMetaDatabase {
  private getCurrentRatingValues = async (
    userId: string
  ): Promise<ReviewMeta> => {
    try {
      return await prismaClient.reviewMeta.upsert({
        create: {
          averageRating: 0,
          numberRating: 0,
          userId
        },
        update: {},
        where: {
          userId
        }
      });
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  };

  private updateRatingValues = async ({
    userId,
    averageRating,
    numberRating
  }: IUpdateRatingValuesInput): Promise<ReviewMeta> => {
    try {
      return await prismaClient.reviewMeta.update({
        data: {
          averageRating,
          numberRating
        },
        where: {
          userId
        }
      });
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  };

  updateAverageReviewRating = async (
    userId: string,
    newRating: number
  ): Promise<ReviewMeta> => {
    try {
      const {
        averageRating: currentAverageRating,
        numberRating: currentNumberRating
      } = await this.getCurrentRatingValues(userId);

      const calculatedReviewMeta = ReviewMetaHelper.calculateRatingValues({
        newRating,
        currentNumberRating,
        currentAverageRating
      });

      return await this.updateRatingValues({
        userId,
        ...calculatedReviewMeta
      });
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  };
}
