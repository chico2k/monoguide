import type { ReviewMeta } from '@prisma/client';

export interface ICalculateRatingValuesInput {
  currentNumberRating: number;
  newRating: number;
  currentAverageRating: number;
}
export interface ICalculateRatingValuesOutput {
  numberRating: number;
  averageRating: number;
}

export interface IUpdateRatingValuesInput {
  userId: string;
  averageRating: number;
  numberRating: number;
}

export interface IReviewMetaDatabase {
  updateAverageReviewRating: (
    userId: string,
    newRating: number
  ) => Promise<ReviewMeta>;
}
