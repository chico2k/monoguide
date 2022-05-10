import type { Review } from '@prisma/client';
import { produce } from 'immer';
import type {
  IReviewCreateInput,
  IReviewDatabase,
  IReviewWithAuthor
} from './types';
import { ReviewTestFactory } from './ReviewTestFactory';

class ReviewTestDatabase implements IReviewDatabase {
  reviews: IReviewWithAuthor[] = [];

  reviewTestFactory = new ReviewTestFactory();

  getReview = () => this.reviews;

  createReview = async ({
    rating,
    title,
    text,
    userId,
    authorId
  }: IReviewCreateInput): Promise<IReviewWithAuthor> => {
    const newReview = this.reviewTestFactory.createReviewWithAuthor({
      rating,
      title,
      text,
      userId,
      authorId
    });

    this.reviews = produce(this.reviews, (draft) => {
      draft.push(newReview);
    });

    return newReview;
  };

  getReviewDetail = async (reviewId: number): Promise<Review> =>
    this.reviews.find((review) => review.id === reviewId) as Review;

  checkReviewExists = async (
    userId: string,
    authorId: string
  ): Promise<boolean> => {
    const reviewExist = this.reviews.find(
      (review) => review.userId === userId && review.authorId === authorId
    );

    if (reviewExist) return true;
    return false;
  };

  getReviewsOfAuthor = async (authorId: string): Promise<IReviewWithAuthor[]> =>
    this.reviews.filter((review) => review.authorId === authorId);
}

export { ReviewTestDatabase };
