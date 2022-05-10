import { Logger } from '@sportsguide/lib';
import { Inject, Service } from 'typedi';
import type { IReviewResponseDatabase } from '@sportsguide/database';
import type { IContext } from "../../lib/apolloServer/types";
import { ContainerInjection } from '../../lib/ContainerInjection';
import type { ICreateReviewResponseOutput, ReviewResponseInput } from './types';

@Service()
export class ReviewResponseService {
  constructor(
    @Inject(ContainerInjection.containerNames.DB_REVIEWRESPONSE)
    private readonly reviewResponseDatabase: IReviewResponseDatabase
  ) {}

  createReviewResponseService = async (
    data: ReviewResponseInput,
    ctx: IContext
  ): Promise<ICreateReviewResponseOutput> => {
    const { reviewId, text } = data;

    try {
      const authorId = ctx.auth.getUserId();

      const exits = await this.reviewResponseDatabase.checkReviewResponseExists(
        reviewId,
        authorId
      );

      if (exits) {
        Logger.error('REVIEW_RESPONSE_EXISTED');
        return {
          type: 'CreateReviewResponseFail'
        };
      }

      const reviewResponse =
        await this.reviewResponseDatabase.createReviewResponse({
          text,
          authorId,
          reviewId
        });

      return {
        type: 'CreateReviewResponseSuccess',
        data: {
          reviewResponse
        }
      };
    } catch (error) {
      Logger.error('error', error);
      return {
        type: 'CreateReviewResponseFail'
      };
    }
  };
}
