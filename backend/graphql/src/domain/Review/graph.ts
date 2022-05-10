/* eslint-disable @typescript-eslint/no-var-requires */
import { ObjectType, Field, Int } from 'type-graphql';
import { ReviewAuthor } from './types';
import 'reflect-metadata';
import ReviewResponse from '../ReviewResponse/graph';

@ObjectType('Review')
class Review {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  text: string;

  @Field(() => Int)
  rating: number;

  @Field(() => Boolean)
  isPublished: boolean;

  @Field(() => String)
  userId: string;

  @Field(() => ReviewAuthor)
  author: ReviewAuthor;

  @Field(() => String)
  createdAt: Date;

  @Field(() => ReviewResponse, { nullable: true })
  reviewResponse?: ReviewResponse;
}

export default Review;
