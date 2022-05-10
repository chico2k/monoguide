import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType('TagRef')
class TagRef {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  text: string;
}

export default TagRef;
