import { ObjectType, Field , Int } from 'type-graphql';
import SportRef from '../SportRef/graph';

@ObjectType('Sport')
export class Sport {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  level: number;

  @Field(() => SportRef)
  sportRef: SportRef;
}

export default Sport;
