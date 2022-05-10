/* eslint-disable max-classes-per-file */
import type { Location } from '@prisma/client';
import { Field, Float, InputType, ObjectType } from 'type-graphql';

@ObjectType('LocationGeometryResponse')
@InputType('LocationGeometryInput')
export class LocationGeometry implements ILocationGeometry {
  @Field(() => String)
  type: string;

  @Field(() => [Float, Float], { nullable: true })
  coordinates: [number, number];
}

@InputType('LocationContextInput')
@ObjectType('LocationContextResponse')
export class LocationContext implements ILocationContext {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: true })
  wikidata: string;

  @Field(() => String, { nullable: true })
  short_code: string;

  @Field(() => String)
  text: string;
}

@InputType('LocationMapBoxInput')
@ObjectType('LocationMapBoxResponse')
export class LocationMapBox implements ILocationMapBox {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: true })
  type: string;

  @Field(() => [String], { nullable: true })
  place_type: [string];

  @Field(() => Float, { nullable: true })
  relevance: number;

  @Field(() => String, { nullable: true })
  text: string;

  @Field(() => String, { nullable: true })
  place_name: string;

  @Field(() => [Float], { nullable: true })
  bbox: [number];

  @Field(() => [Float], { nullable: true })
  center: [number];

  @Field(() => LocationGeometry, { nullable: true })
  geometry: LocationGeometry;

  @Field(() => [LocationContext], { nullable: true })
  context: [LocationContext];
}

export interface ILocationMapBox {
  id: string;
  type: string;
  place_type: [string];
  relevance: number;
  text: string;
  place_name: string;
  bbox: [number];
  center: [number];
  geometry: ILocationGeometry;
  context: [ILocationContext];
}

export interface ILocationGeometry {
  type: string;
  coordinates: [number, number];
}

export interface ILocationContext {
  id: string;
  wikidata: string;
  short_code: string;
  text: string;
}

export interface ILocationCustomContext {
  region?: {
    id?: string;
    text?: string;
  };
  country?: {
    id: string;
    text: string;
  };
}

export type IGetLocationOutput = IGetLocationSuccess | IGetLocationFail;
export type IGetLocationSuccess = {
  type: 'GetLocationSuccess';
  data: {
    locationMapbox: LocationMapBox;
  };
};
export type IGetLocationFail = { type: 'GetLocationFail' };

export type ICreateLocationOutput =
  | ICreateLocationSuccess
  | ICreateLocationFail;

export type ICreateLocationSuccess = {
  type: 'CreateLocationSuccess';
  data: { location: Location };
};
export type ICreateLocationFail = { type: 'CreateLocationFail' };
