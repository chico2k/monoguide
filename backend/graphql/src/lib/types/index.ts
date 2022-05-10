/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-classes-per-file */
import type { IVerfiySessionSuccess } from '@sportsguide/auth';
import type jwkToBuffer from 'jwk-to-pem';
import { ObjectType, Field, Float, ClassType } from 'type-graphql';

export default function ElasticResponse<TItemsFieldValue>(
  Index: ClassType<TItemsFieldValue>
): Object {
  @ObjectType(`${Index.name}Hits_Inner`)
  class HitsInner<T> {
    @Field(() => String)
    _index: string;

    @Field(() => String)
    _type: string;

    @Field(() => String)
    _id: string;

    @Field(() => Float)
    _score: number;

    @Field(() => Index)
    _source: T;

    @Field(() => Float)
    _version?: number;

    @Field(() => [String])
    matched_queries?: string[];

    @Field(() => [String])
    sort?: string[];
  }

  @ObjectType(`${Index.name}ShardsResponse`, { isAbstract: true })
  class ShardsResponse {
    @Field(() => Float)
    total: number;

    @Field(() => Float)
    successful: number;

    @Field(() => Float)
    failed: number;

    @Field(() => Float)
    skipped: number;
  }
  @ObjectType(`${Index.name}Total`, { isAbstract: true })
  class Total {
    @Field(() => Float)
    value: number;

    @Field(() => String)
    relation: string;
  }

  @ObjectType(`${Index.name}Hits`)
  class Hits {
    @Field(() => Total)
    total: Total;

    @Field(() => Float)
    max_score: number;

    @Field(() => [HitsInner], { nullable: true })
    hits: [HitsInner<typeof Index>];

    aggregations?: unknown;
  }

  @ObjectType(`${Index.name}PageInfo`)
  class PageInfo {
    @Field(() => String, { nullable: true })
    cursor: string;

    @Field(() => String, { nullable: true })
    lastPage: string;

    @Field(() => Boolean, { nullable: true })
    nextPage: boolean;
  }

  @ObjectType(`${Index.name}ElasticResponse`, { isAbstract: true })
  abstract class ElasticListResponse {
    @Field(() => Float)
    took?: number;

    @Field(() => Boolean)
    timed_out?: boolean;

    @Field(() => ShardsResponse)
    _shards?: ShardsResponse;

    @Field(() => Hits)
    hits: Hits;

    @Field(() => PageInfo, { nullable: true })
    pageInfo: PageInfo;
  }

  return ElasticListResponse;
}

export interface IAuthKey {
  keys: [
    {
      kid: string;
      alg: string;
      e: string;
      n: string;
      use: string;
      kty: jwkToBuffer.RSA['kty'];
    }
  ];
}

export type IContext = {
  auth: IVerfiySessionSuccess;
};
