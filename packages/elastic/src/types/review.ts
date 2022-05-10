/* eslint-disable @typescript-eslint/no-explicit-any */

import type { SearchResponse } from '@elastic/elasticsearch/api/types';
import type { IReviewWithAuthor } from '@sportsguide/database';
import type { ReviewResponse } from '@prisma/client';
import type { ObjectField, IIndexBody } from './index';

/**
 * Review Elastic
 */
export interface IReviewElastic {
  getReviewDetail: (reviewId: number) => Promise<IReviewDetailOutput>;
  getReviewList: ({ userId }: { userId: string }) => Promise<IReviewListOutput>;
  userHasReviewed: (
    authorId: string,
    userId: string
  ) => Promise<IReviewHasReviewedOutput>;
  createReview: (reviewDatabase: IReviewWithAuthor) => Promise<boolean>;
  createReviewResponse: (
    reviewResponseDatabase: ReviewResponse
  ) => Promise<boolean>;
}

interface IReviewListError {
  type: 'ReviewListError';
}
interface IReviewListSuccess {
  type: 'ReviewListSuccess';
  output: IReviewElasticSearchResponse;
}

export type IReviewListOutput = IReviewListError | IReviewListSuccess;

interface IReviewDetailError {
  type: 'ReviewDetailError';
}
interface IReviewDetailSuccess {
  type: 'ReviewDetailSuccess';
  output: IReviewElasticSearchResponse;
}

export type IReviewDetailOutput = IReviewDetailError | IReviewDetailSuccess;
interface IReviewHasReviewedError {
  type: 'ReviewHasReviewedError';
}
interface IReviewHasReviewedSuccess {
  type: 'ReviewHasReviewedSuccess';
  output: boolean;
}

export type IReviewHasReviewedOutput =
  | IReviewHasReviewedError
  | IReviewHasReviewedSuccess;

/**
 * Review Index
 */

export interface IReviewIndex {
  name: string;
  body: IIndexBody<IUserReviewIndexMapping>;
}

export interface IUserReviewIndexMapping {
  dynamic: string;
  properties: IReviewProperties & IReviewObjectAuthor & IReviewObjectResponse;
}

export type IReviewElasticSearchResponse =
  SearchResponse<IReviewElasticDocument>;

/**
 * Review
 */

export interface IReviewElasticDocument {
  userId: string;
  id: number;
  text: string;
  isPublished: boolean;
  title: string;
  createdAt: Date;
  rating: number;

  author: IReviewAuthorElastic;
  reviewResponse?: IReviewResponseElastic;
}

type IReviewProperties = {
  [key in keyof IReviewElasticDocument]: any;
};

/**
 * Author
 */

interface IReviewAuthorElastic {
  id: string;
  firstName: string;
  lastName: string;
}
type IReviewAuthorElasticProperties = {
  [key in keyof IReviewAuthorElastic]: any;
};

type IReviewObjectAuthor = {
  author: ObjectField<IReviewAuthorElasticProperties>;
};

/**
 * Review Response
 */
export interface IReviewResponseElastic {
  id: number;
  createdAt: Date;
  isPublished: boolean;
  text: string;
}

type IReviewResponseElasticProperties = {
  [key in keyof IReviewResponseElastic]: any;
};

export type IReviewObjectResponse = {
  reviewResponse: ObjectField<IReviewResponseElasticProperties>;
};
