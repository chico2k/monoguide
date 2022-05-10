import type { ReviewResponse } from '@prisma/client';
import { produce } from 'immer';
import type { IReviewResponseDatabase } from '.';
import { ReviewResponseTestFactory } from './ReviewResponseTestFactory';
import type { ICreateReviewResponseInput } from './types';

class ReviewResponseTestDatabase implements IReviewResponseDatabase {
  reviewResponse: ReviewResponse[] = [];

  getReviewResponse = () => this.reviewResponse;

  createReviewResponse = async ({
    authorId,
    reviewId,
    text
  }: ICreateReviewResponseInput): Promise<ReviewResponse> => {
    const reviewResponseFactory = new ReviewResponseTestFactory();

    const newReviewResponse = reviewResponseFactory.mapReviewReponseCreateInput(
      {
        authorId,
        reviewId,
        text
      }
    );

    this.reviewResponse = produce(this.reviewResponse, (draft) => {
      draft.push(newReviewResponse);
    });

    return newReviewResponse;
  };

  checkReviewResponseExists = async (
    reviewId: number,
    authorId: string
  ): Promise<boolean> => {
    const reviewResponseExists = this.reviewResponse.find(
      (singleReviewResponse) =>
        singleReviewResponse.reviewId === reviewId &&
        singleReviewResponse.authorId === authorId
    );

    if (reviewResponseExists) return true;

    return false;
  };
}

export { ReviewResponseTestDatabase };
