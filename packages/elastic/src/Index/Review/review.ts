import { Logger } from '@sportsguide/lib';
import type { IReviewWithAuthor } from '@sportsguide/database';
import type { ReviewResponse } from '@prisma/client';
import type {
  IReviewDetailOutput,
  IReviewElasticDocument,
  IReviewHasReviewedOutput,
  IReviewListOutput,
  IReviewElastic
} from '../../types/review';
import esClient from '../../client';
import { ConfigHandler } from '../../ConfigHandler';
import { ReviewElasticMapper } from '../../Mapper/reivew';

/**
 * The User Elastic Index
 */
export class ReviewElastic implements IReviewElastic {
  readIndex: string;

  writeIndex: string;

  constructor() {
    const indexType = 'review';

    this.readIndex = ConfigHandler.getReadAlias(indexType);
    this.writeIndex = ConfigHandler.getWriteAlias(indexType);
  }

  getReviewDetail = async (reviewId: number): Promise<IReviewDetailOutput> => {
    try {
      const response = await esClient.search<IReviewElasticDocument>({
        index: this.readIndex,
        body: {
          query: {
            bool: {
              must: [
                {
                  match: {
                    id: reviewId
                  }
                },
                {
                  match: {
                    published: true
                  }
                }
              ]
            }
          }
        }
      });

      return {
        type: 'ReviewDetailSuccess',
        output: response.body
      };
    } catch (error) {
      Logger.error('error', error);

      return {
        type: 'ReviewDetailError'
      };
    }
  };

  getReviewList = async ({
    userId
  }: {
    userId: string;
  }): Promise<IReviewListOutput> => {
    try {
      const response = await esClient.search<IReviewElasticDocument>({
        index: this.readIndex,
        body: {
          query: {
            bool: {
              must: [
                {
                  match: {
                    published: true
                  }
                },

                {
                  match: {
                    user_id: userId
                  }
                }
              ]
            }
          }
        }
      });

      // No Review was found - must be an error
      if (response.body.hits.hits.length === 0)
        return {
          type: 'ReviewListError'
        };

      return {
        type: 'ReviewListSuccess',
        output: response.body
      };
    } catch (error) {
      Logger.error('error', error);
      return {
        type: 'ReviewListError'
      };
    }
  };

  userHasReviewed = async (
    authorId: string,
    userId: string
  ): Promise<IReviewHasReviewedOutput> => {
    try {
      const { body } = await esClient.count({
        index: this.readIndex,
        body: {
          query: {
            bool: {
              must: [
                {
                  match: {
                    'author.id': authorId
                  }
                },
                {
                  match: {
                    user_id: userId
                  }
                }
              ]
            }
          }
        }
      });

      if (body.count > 0)
        return { type: 'ReviewHasReviewedSuccess', output: true };

      return { type: 'ReviewHasReviewedSuccess', output: false };
    } catch (error) {
      Logger.error('error', error);
      return { type: 'ReviewHasReviewedError' };
    }
  };

  createReview = async (
    reviewDatabase: IReviewWithAuthor
  ): Promise<boolean> => {
    const mappedReview = ReviewElasticMapper.mapReview(reviewDatabase);

    try {
      await esClient.update({
        index: this.writeIndex,
        id: mappedReview.id.toString(),
        body: {
          doc: {
            ...mappedReview
          },
          doc_as_upsert: true
        },
        retry_on_conflict: 5
      });
      return true;
    } catch (error) {
      Logger.error('error', error);
      return false;
    }
  };

  createReviewResponse = async (
    reviewRespone: ReviewResponse
  ): Promise<boolean> => {
    const mappedReviewResponse =
      ReviewElasticMapper.mapReviewResponse(reviewRespone);
    try {
      await esClient.update({
        index: this.writeIndex,
        id: reviewRespone.reviewId.toString(),
        body: {
          script: {
            source: `
                    ctx._source.review_response = params.reviewResponse;
                    `,
            params: {
              mappedReviewResponse
            }
          }
        }
      });
      return true;
    } catch (error) {
      Logger.error('error', error);
      return false;
    }
  };
}
