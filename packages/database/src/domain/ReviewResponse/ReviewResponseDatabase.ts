import type { ReviewResponse } from '@prisma/client';
import { Logger } from '@sportsguide/lib';
import prismaClient from '../../lib/prisma';
import type { IReviewResponseDatabase } from '.';
import type { ICreateReviewResponseInput } from './types';

class ReviewResponseDatabase implements IReviewResponseDatabase {
  createReviewResponse = async ({
    authorId,
    reviewId,
    text
  }: ICreateReviewResponseInput): Promise<ReviewResponse> => {
    try {
      return await prismaClient.reviewResponse.create({
        data: {
          authorId,
          reviewId,
          text
        }
      });
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  };

  checkReviewResponseExists = async (
    reviewId: number,
    authorId: string
  ): Promise<boolean> => {
    try {
      const review = await prismaClient.reviewResponse.findFirst({
        where: {
          authorId,
          reviewId
        }
      });

      if (review) return true;
      return false;
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  };
}

export { ReviewResponseDatabase };
