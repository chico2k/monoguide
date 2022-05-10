import { Resolver, Mutation, Arg, UseMiddleware, Ctx } from 'type-graphql';
import Container from 'typedi';
import { AuthProvider } from '@sportsguide/auth';
import type { IContext } from "../../lib/apolloServer/types";
import { ReviewResponseInput } from './types';
import ReviewResponse from './graph';
import { ReviewResponseController } from './controller';

@Resolver()
export class ReviewResponseResolver {
  reviewResponseController = Container.get(ReviewResponseController);

  @UseMiddleware(AuthProvider)
  @Mutation(() => ReviewResponse)
  async createReviewResponse(
    @Arg('data') data: ReviewResponseInput,
    @Ctx() ctx: IContext
  ): Promise<ReviewResponse> {
    return this.reviewResponseController.createReviewResponseService(
      data,
      ctx
    );
  }
}
