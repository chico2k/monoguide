import { Field, ObjectType } from 'type-graphql';

import Sport from '../Sport/graph';
import Location from '../Location/graph';
import Tag from '../Tag/graph';
import Vita from '../Vita/graph';
import { ReviewMeta } from '../ReviewMeta/graph';
import { Avatar } from '../Avatar/graph';

@ObjectType('User')
class User {
  @Field(() => String)
  id: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  username: string;

  @Field(() => Boolean)
  isGuide: boolean;

  @Field(() => Location, { nullable: true })
  location: Location | null;

  @Field(() => [Sport], { nullable: true })
  sport: Sport[] | null;

  @Field(() => [Vita])
  vita: Vita[] | null;

  @Field(() => [Tag], { nullable: true })
  tag?: Tag[];

  @Field(() => Avatar, { nullable: true })
  avatar: Avatar | null;

  @Field(() => ReviewMeta, { nullable: true })
  reviewMeta: ReviewMeta | null;
}

export default User;
