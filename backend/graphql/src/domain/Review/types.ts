import type {
  IReviewElasticSearchResponse,
  IReviewListOutput
} from '@sportsguide/elastic';
import { IsInt, Min, Max } from 'class-validator';
import { Field, InputType, Int, ObjectType } from 'type-graphql';

@InputType()
export class ReviewInput {
  @Field(() => Int)
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @Field(() => String)
  text: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  userId: string;
}

@ObjectType('ReviewAuthor')
export class ReviewAuthor {
  @Field(() => String)
  id: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;
}

export type ICreateReviewOuput = ICreateReviewSuccess | ICreateReviewFail;
type ICreateReviewSuccess = { type: 'CreateReviewSuccess' };
type ICreateReviewFail = { type: 'CreateReviewFail' };

export type IGetReviewListOuput = IGetReviewListSuccess | IGetReviewListFail;
type IGetReviewListSuccess = {
  type: 'GetReviewListSuccess';
  data: {
    review: IReviewListOutput;
  };
};
type IGetReviewListFail = { type: 'GetReviewListFail' };

export type IGetReviewDetailOuput =
  | IGetReviewDetailSuccess
  | IGetReviewDetailFail;

type IGetReviewDetailSuccess = {
  type: 'GetReviewDetailSuccess';
  data: {
    review: IReviewElasticSearchResponse;
  };
};
type IGetReviewDetailFail = { type: 'GetReviewDetailFail' };
