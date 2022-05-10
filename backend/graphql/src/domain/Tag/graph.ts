import { ObjectType, Field, Int } from 'type-graphql';
import TagRef from '../TagRef/graph';

@ObjectType('Tag')
class Tag {
  @Field(() => Int)
  id: number;

  @Field(() => TagRef)
  tagRef: TagRef;
}

export default Tag;
