import { ObjectType, Field } from 'type-graphql';

@ObjectType('Avatar')
class Avatar {
  @Field(() => String)
  url: string | null;

  @Field(() => String)
  blurBase64: string | null;
}
export { Avatar };
