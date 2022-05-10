import {
  Resolver,
  Query,
  Arg,
  Int,
  Mutation,
  Ctx,
  UseMiddleware
} from 'type-graphql';
import Container, { Service } from 'typedi';
import { AuthProvider } from '@sportsguide/auth';
import type { IContext } from "../../lib/apolloServer/types";
import Review from './graph';
import { ReviewInput } from './types';
import ElasticResponse from '../../lib/types';
import { ReviewController } from './controller';

const ReviewListResponse = ElasticResponse(Review);
@Service()
@Resolver()
export class ReviewResolver {
  reviewController = Container.get(ReviewController);

  @Query(() => ReviewListResponse)
  async getReviewList(
    @Arg('username', () => String) username: string
  ): Promise<typeof ReviewListResponse> {
    return this.reviewController.getReviewListController(username);
  }

  @Query(() => Review)
  async getReviewDetail(
    @Arg('reviewId', () => Int) reviewId: number
  ): Promise<Review> {
    return this.reviewController.getReviewDetailController(reviewId);
  }

  @UseMiddleware(AuthProvider)
  @Mutation(() => Review)
  async createReview(
    @Arg('data') data: ReviewInput,
    @Ctx() ctx: IContext
  ): Promise<Review> {
    return this.reviewController.createReviewController(data, ctx);
  }
}
