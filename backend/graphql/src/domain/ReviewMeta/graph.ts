import { ObjectType, Field } from 'type-graphql';

@ObjectType('ReviewMeta')
class ReviewMeta {
  @Field(() => Number)
  averageRating: number;

  @Field(() => Number)
  numberRating: number;
}

export { ReviewMeta };
