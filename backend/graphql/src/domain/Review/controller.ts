/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Container, { Service } from 'typedi';
import type { IReviewWithAuthor } from '@sportsguide/database';
import type {
  IReviewElasticDocument,
  IReviewListOutput
} from '@sportsguide/elastic';
import { ValidationError } from 'apollo-server-lambda';
import type { IContext } from '../../lib/apolloServer/types';
import { ReviewService } from './service';
import type { ReviewInput } from './types';

@Service()
class ReviewController {
  reviewService = Container.get(ReviewService);

  createReviewController = async (
    data: ReviewInput,
    ctx: IContext
  ): Promise<IReviewWithAuthor> =>
    this.reviewService.createReviewService(data, ctx);

  getReviewDetailController = async (
    reviewId: number
  ): Promise<IReviewElasticDocument> => {
    const reviewOrError = await this.reviewService.getReviewDetailService(
      reviewId
    );

    switch (reviewOrError.type) {
      case 'GetReviewDetailSuccess':
        // eslint-disable-next-line no-underscore-dangle
        return reviewOrError.data.review.hits.hits[0]._source!;
      case 'GetReviewDetailFail':
        throw new ValidationError('SPORT_SERVICE_FAILED');
    }
  };

  getReviewListController = async (
    username: string
  ): Promise<IReviewListOutput> => {
    const reviewOrError = await this.reviewService.getReviewListService(
      username
    );

    switch (reviewOrError.type) {
      case 'GetReviewListSuccess':
        return reviewOrError.data.review;
      case 'GetReviewListFail':
        throw new ValidationError('REVIEW_SERVICE_FAILED');
    }
  };
}

export { ReviewController };
