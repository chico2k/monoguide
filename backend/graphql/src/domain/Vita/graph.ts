import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType('Vita')
class Vita {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  text: string;

  @Field(() => Date)
  fromDate: Date;

  @Field(() => Date || null)
  toDate: Date | null;

  @Field(() => Boolean)
  isCurrent: boolean;

  @Field(() => Boolean)
  isPublished: boolean;
}

export default Vita;
