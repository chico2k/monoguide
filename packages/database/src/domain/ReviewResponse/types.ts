import type { ReviewResponse } from '@prisma/client';

export interface IReviewResponseDatabase {
  createReviewResponse: ({
    authorId,
    reviewId,
    text
  }: ICreateReviewResponseInput) => Promise<ReviewResponse>;

  checkReviewResponseExists: (
    reviewId: number,
    authorId: string
  ) => Promise<boolean>;
}

export interface ICreateReviewResponseInput {
  authorId: string;
  reviewId: number;
  text: string;
}
