import { Logger } from '@sportsguide/lib';
import { Inject, Service } from 'typedi';
import type {
  IReviewDatabase,
  IReviewMetaDatabase,
  IUserDatabase,
  IReviewWithAuthor
} from '@sportsguide/database';
import { ApolloError } from 'apollo-server-lambda';
import type { IReviewElastic } from '@sportsguide/elastic';
import { ContainerInjection } from '../../lib/ContainerInjection';
import type { IContext } from '../../lib/apolloServer/types';
import type {
  IGetReviewDetailOuput,
  IGetReviewListOuput,
  ReviewInput
} from './types';

@Service()
export class ReviewService {
  constructor(
    @Inject(ContainerInjection.containerNames.DB_REVIEW)
    private readonly reviewDatabase: IReviewDatabase,
    @Inject(ContainerInjection.containerNames.DB_REVIEWMETA)
    private readonly reviewMetaDatabase: IReviewMetaDatabase,
    @Inject(ContainerInjection.containerNames.DB_USER)
    private readonly userDatabase: IUserDatabase,
    @Inject(ContainerInjection.containerNames.ES_REVIEW)
    private readonly elasticReview: IReviewElastic
  ) {}

  createReviewService = async (
    data: ReviewInput,
    ctx: IContext
  ): Promise<IReviewWithAuthor> => {
    const { rating, text, title, userId } = data;

    try {
      const authorId = ctx.auth.getUserId();

      if (authorId === userId)
        throw new ApolloError('REVIEW_SERVICE_NOT_SUCCESSFUL');

      const exits = await this.reviewDatabase.checkReviewExists(
        userId,
        authorId
      );
      if (exits) throw new ApolloError('REVIEW_SERVICE_NOT_SUCCESSFUL');

      const review = await this.reviewDatabase.createReview({
        rating,
        text,
        title,
        userId,
        authorId
      });

      await this.reviewMetaDatabase.updateAverageReviewRating(userId, rating);

      return review;
    } catch (error) {
      Logger.error('error', error);
      throw new ApolloError('REVIEW_SERVICE_NOT_SUCCESSFUL');
    }
  };

  getReviewDetailService = async (
    reviewId: number
  ): Promise<IGetReviewDetailOuput> => {
    try {
      const reviewOrError = await this.elasticReview.getReviewDetail(reviewId);

      if (reviewOrError.type === 'ReviewDetailError')
        return { type: 'GetReviewDetailFail' };

      return {
        type: 'GetReviewDetailSuccess',
        data: { review: reviewOrError.output }
      };
    } catch (error) {
      Logger.error('error', error);
      return { type: 'GetReviewDetailFail' };
    }
  };

  getReviewListService = async (
    username: string
  ): Promise<IGetReviewListOuput> => {
    try {
      const user = await this.userDatabase.getUserByUsername(username);
      if (!user) {
        Logger.error('error', 'REVIEW_LIST_USER_NOT_FOUND_BY_USERNAME');
        return { type: 'GetReviewListFail' };
      }

      const { id: userId } = user;
      const review = await this.elasticReview.getReviewList({ userId });
      return { type: 'GetReviewListSuccess', data: { review } };
    } catch (error) {
      Logger.error('error', error);
      return { type: 'GetReviewListFail' };
    }
  };
}
