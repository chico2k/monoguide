import type { IReviewWithAuthor } from '@sportsguide/database';
import type { ReviewResponse } from '@prisma/client';
import type {
  IReviewResponseElastic,
  IReviewElasticDocument
} from '../types/review';

export class ReviewElasticMapper {
  static mapReview = (
    reviewDatabase: IReviewWithAuthor
  ): IReviewElasticDocument => ({
    userId: reviewDatabase.userId,
    id: reviewDatabase.id,
    text: reviewDatabase.text,
    isPublished: reviewDatabase.isPublished,
    title: reviewDatabase.title,
    rating: reviewDatabase.rating,
    createdAt: reviewDatabase.createdAt,
    author: {
      id: reviewDatabase.author.id,
      firstName: reviewDatabase.author.firstName,
      lastName: reviewDatabase.author.lastName
    }
  });

  static mapReviewResponse = (
    reviewResponseDatabase: ReviewResponse
  ): IReviewResponseElastic => ({
    id: reviewResponseDatabase.id,
    text: reviewResponseDatabase.text,
    isPublished: reviewResponseDatabase.isPublished,
    createdAt: reviewResponseDatabase.createdAt
  });
}
