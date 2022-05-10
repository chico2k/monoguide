import { Logger } from '@sportsguide/lib';
import type { Review as ReviewDB } from '@prisma/client';
import type { IReviewWithAuthor } from '.';
import prismaClient from '../../lib/prisma';
import type { IReviewCreateInput, IReviewDatabase } from './types';

class ReviewDatabase implements IReviewDatabase {
  createReview = async ({
    rating,
    title,
    text,
    userId,
    authorId
  }: IReviewCreateInput): Promise<IReviewWithAuthor> => {
    try {
      return await prismaClient.review.create({
        data: {
          rating,
          title,
          text,
          userId,
          authorId,
          isPublished: true
        },
        include: {
          author: true
        }
      });
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  };

  getReviewDetail = async (reviewId: number): Promise<ReviewDB> => {
    try {
      const review = await prismaClient.review.findUnique({
        where: { id: reviewId },
        include: {
          author: true
        }
      });

      if (!review) throw new Error('REVIEW_SERVICE_NOT_FOUND');
      return review;
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  };

  checkReviewExists = async (
    userId: string,
    authorId: string
  ): Promise<boolean> => {
    try {
      const review = await prismaClient.review.findFirst({
        where: {
          authorId,
          userId
        }
      });

      if (review) return true;
      return false;
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  };

  getReviewsOfAuthor = async (
    authorId: string
  ): Promise<IReviewWithAuthor[]> => {
    try {
      const review = await prismaClient.review.findMany({
        where: { authorId },
        include: {
          author: true
        }
      });

      return review;
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  };
}

export { ReviewDatabase };
