import 'reflect-metadata';
import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType('Location')
class Location {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  placeName: string;

  @Field(() => String)
  coordinates: string;

  @Field(() => String)
  placeType: string;

  @Field(() => String)
  text: string;

  @Field(() => String, { nullable: true })
  regionId?: string | null;

  @Field(() => String, { nullable: true })
  regionText?: string | null;

  @Field(() => String, { nullable: true })
  countryId?: string | null;

  @Field(() => String, { nullable: true })
  countryText?: string | null;
}

export default Location;
