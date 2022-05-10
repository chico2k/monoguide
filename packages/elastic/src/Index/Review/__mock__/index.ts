import type { ReviewResponse } from '@prisma/client';
import { produce } from 'immer';
import type { IReviewWithAuthor } from '@sportsguide/database';
import { ReviewElasticMapper } from '../../../Mapper/reivew';
import type {
  IReviewElastic,
  IReviewDetailOutput,
  IReviewHasReviewedOutput,
  IReviewListOutput,
  IReviewElasticDocument,
  IReviewElasticSearchResponse
} from '../../../types/review';
import { elasticReviewSeed } from './data';

class ReviewElasticMock implements IReviewElastic {
  reviews: IReviewElasticDocument[] = elasticReviewSeed;

  private convertReviewsToSearchResponse = (
    reviews: IReviewElasticDocument[]
  ): IReviewElasticSearchResponse => {
    const searchResponse = {
      took: 1,
      timed_out: false,
      _shards: {
        failed: 0,
        successful: 1,
        total: 1,
        skipped: 0
      },
      hits: {
        hits: this.convertReviews(reviews),
        total: this.reviews.length
      }
    };

    return searchResponse;
  };

  private convertReviews = (reviews: IReviewElasticDocument[]) => {
    const convertedUser = reviews.map((review) => ({
      _id: `${review.id}`,
      _index: 'review',
      _source: { ...review }
    }));
    return convertedUser;
  };

  getReviewDetail = async (reviewId: number): Promise<IReviewDetailOutput> => {
    const index = this.reviews.findIndex((review) => review.id === reviewId);

    if (index === -1)
      return {
        type: 'ReviewDetailError'
      };

    return {
      type: 'ReviewDetailSuccess',
      output: this.convertReviewsToSearchResponse([this.reviews[index]])
    };
  };

  getReviewList = async ({
    userId
  }: {
    userId: string;
  }): Promise<IReviewListOutput> => {
    const reviews = this.reviews.filter((review) => review.userId === userId);

    return {
      type: 'ReviewListSuccess',
      output: this.convertReviewsToSearchResponse(reviews)
    };
  };

  createReview = async (
    reviewDatabase: IReviewWithAuthor
  ): Promise<boolean> => {
    const review = ReviewElasticMapper.mapReview(reviewDatabase);
    this.reviews = produce(this.reviews, (draft) => {
      draft.push(review);
    });
    return true;
  };

  createReviewResponse = async (
    reviewResponseDatabase: ReviewResponse
  ): Promise<boolean> => {
    const reviewResponse = ReviewElasticMapper.mapReviewResponse(
      reviewResponseDatabase
    );

    const index = this.reviews.findIndex(
      (review) => review.id === reviewResponseDatabase.reviewId
    );

    this.reviews = produce(this.reviews, (draft) => {
      draft[index].reviewResponse = reviewResponse;
    });

    return true;
  };

  userHasReviewed = async (
    authorId: string,
    userId: string
  ): Promise<IReviewHasReviewedOutput> => {
    const index = this.reviews.findIndex(
      (review) => review.author.id === authorId && review.userId === userId
    );

    if (index === -1)
      return {
        type: 'ReviewHasReviewedSuccess',
        output: false
      };
    return {
      type: 'ReviewHasReviewedSuccess',
      output: true
    };
  };
}

export { ReviewElasticMock };
