import type { ICreateReviewResponseInput } from '@sportsguide/database';
import { IsInt } from 'class-validator';
import { Field, InputType, Int } from 'type-graphql';
import type { ReviewResponse } from './graph';

@InputType('ReviewResponseInput')
export class ReviewResponseInput
  implements Omit<ICreateReviewResponseInput, 'authorId'>
{
  @Field(() => Int)
  @IsInt()
  reviewId: number;

  @Field(() => String)
  text: string;
}

export type ICreateReviewResponseOutput =
  | ICreateReviewResponseSuccess
  | ICreateReviewResponseFail;

type ICreateReviewResponseSuccess = {
  type: 'CreateReviewResponseSuccess';
  data: {
    reviewResponse: ReviewResponse;
  };
};
type ICreateReviewResponseFail = {
  type: 'CreateReviewResponseFail';
};
