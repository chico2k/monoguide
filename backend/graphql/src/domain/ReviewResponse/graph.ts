import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType('ReviewResponse')
export class ReviewResponse {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  text: string;

  @Field(() => Boolean)
  isPublished: boolean;

  @Field(() => Date)
  createdAt: Date;
}

export default ReviewResponse;
