import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType('SportRef')
class SportRef {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  title: string;
}

export default SportRef;
