/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SearchResponse } from '@elastic/elasticsearch/api/types';
import type {
  ISportWithSportRef,
  ITagWithTagRef,
  UserTestDatabase
} from '@sportsguide/database';
import type { Location, ReviewMeta, User, Vita } from '@prisma/client';
import type { ObjectField, IIndexBody } from './index';

/**
 * Elastic User
 */

export interface IUserElastic {
  /**
   *
   * @returns The List of Users from Elastic
   */
  getUserList: () => Promise<IUserListOutput>;

  /**
   * Get the User Detail from Elastic
   *
   * @param username
   * @returns
   */
  getUserDetail: (username: string) => Promise<IUserDetailOutput>;

  createUser: (user: User) => Promise<boolean>;

  deleteUser: (userId: string) => Promise<boolean>;

  /**
   * Creates a single new sport entry for a User in Elastic Search
   *
   * @param userId
   * @param sportDatabase
   * @returns true or false
   */

  createSport: (
    userId: string,
    sportDatabase: ISportWithSportRef
  ) => Promise<boolean>;

  /**
   * Updates a single new sport entry for a User in Elastic Search
   *
   * @param userId
   * @param sportDatabase
   * @returns
   */
  updateSport: (
    userId: string,
    sportDatabase: ISportWithSportRef
  ) => Promise<boolean>;

  /**
   * Deletes a single new sport entry for a User in Elastic Search
   *
   * @param userId
   * @param sportId
   * @returns
   */
  deleteSport: (userId: string, sportId: number) => Promise<boolean>;

  /**
   * Updates the Location for a User in ElasticSearch
   *
   * @param userId
   * @param location
   * @returns Promise<boolean>
   */
  updateLocation: (userId: string, location: Location) => Promise<boolean>;

  /**
   * Creates a Tag for a User in ElasticSearch
   *
   * @param userId
   * @param tag
   * @returns Promise<boolean>
   */
  createTag: (userId: string, tag: ITagWithTagRef) => Promise<boolean>;

  /**
   * Deletes a Tag for a User in ElasticSearch
   *
   * @param userId
   * @param tagId
   * @returns Promise<boolean>
   */
  deleteTag: (userId: string, tagId: number) => Promise<boolean>;

  /**
   * Creates a Vita for a User in ElasticSearch
   *
   * @param userId
   * @param vita
   * @returns Promise<boolean>
   */
  createVita: (userId: string, vita: Vita) => Promise<boolean>;

  /**
   * Updates a Vita for a User in ElasticSearch
   *
   * @param userId
   * @param vita
   * @returns Promise<boolean>
   */
  updateVita: (userId: string, vita: Vita) => Promise<boolean>;

  /**
   * Deletes a Vita for User in ElasticSearch
   *
   * @param userId
   * @param vitaId
   * @returns  Promise<boolean>
   */
  deleteVita: (userId: string, vitaId: number) => Promise<boolean>;

  /**
   * Updates Review Meta for User in ElasticSearch
   *
   * @param userId
   * @param reviewMeta
   * @returns Promise<boolean>
   */
  updateReviewMeta: (
    userId: string,
    reviewMeta: ReviewMeta
  ) => Promise<boolean>;
}

interface IUserListError {
  type: 'UserListError';
}

interface IUserListSuccess {
  type: 'UserListSuccess';
  output: IUserElasticSearchResponse;
}

export type IUserListOutput = IUserListSuccess | IUserListError;

interface IUserDetailSuccess {
  type: 'UserDetailSuccess';
  output: IUserElasticSearchResponse;
}

interface IUserDetailError {
  type: 'UserDetailError';
}

export type IUserDetailOutput = IUserDetailSuccess | IUserDetailError;

export type IUserElasticMockClass = IUserElasticDocument & {
  syncUserTestDatabase: (userTestDatabase: UserTestDatabase) => void;
  getUsers: () => IUserElastic[];
};

/**
 * Index
 */
export interface IUserIndex {
  name: string;
  body: IIndexBody<IUserIndexMapping>;
}

export interface IUserIndexMapping {
  dynamic: string;
  properties: IUserProperties &
    IUserObjectVita &
    IUserObjectSport &
    IUserObjectLocation &
    IUserObjectTag &
    IUserObjectAvatarImage &
    IUserObjectReviewMeta;
}

/**
 * Search Response
 */

export type IUserElasticSearchResponse = SearchResponse<IUserElasticDocument>;

/**
 * User Document
 */

export type IUserElasticDocument = IUserElasticUser & {
  sport: IUserElasticSport[];
  vita: IUserElasticVita[];
  tag: IUserElasticTag[];
  location: IUserElasticLocation | null;

  avatar: IUserAvatar | null;
  reviewMeta: IUserReviewMeta | null;
};

export type IUserProperties = {
  [key in keyof IUserElasticDocument]: any;
};

/**
 * User
 */
export interface IUserElasticUser {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  isGuide: boolean;
  isBlacklisted: boolean;
}

/**
 * Sport
 */
export interface IUserElasticSport {
  level: number;
  createdAt: Date;
  id: number;
  sportRef: IUserElasticSportRef;
}

export type IUserObjectSport = {
  sport: ObjectField<IUserElasticSportProperties & IUserObjectSportRef>;
};

type IUserElasticSportProperties = {
  [key in keyof IUserElasticSport]: any;
};

/**
 * Sport Ref
 */

type IUserElasticSportRef = {
  title: string;
  id: number;
};

type IUserElasticSportRefKeys = keyof IUserElasticSportRef;

type IUserElasticSportRefProperties = {
  [key in IUserElasticSportRefKeys]: any;
};

type IUserObjectSportRef = {
  sportRef: ObjectField<IUserElasticSportRefProperties>;
};

/**
 * Vita
 */

export type IUserObjectVita = { vita: ObjectField<IUserElasticVitaProperties> };

type IUserElasticVitaProperties = {
  [key in keyof IUserElasticVita]: any;
};

export interface IUserElasticVita {
  fromDate: Date;
  toDate: Date | null;
  isPublished: boolean;
  id: number;
  title: string;
  text: string;
  isCurrent: boolean;
}

/**
 * Location
 */

export interface IUserElasticLocation {
  id: number;
  mapboxId: string;
  placeName: string;
  placeType: string;
  regionId: string | null;
  regionText: string | null;
  regionWikidata: string | null;
  regionShortcode: string | null;
  countryId: string | null;
  countryText: string | null;
  countryWikidata: string | null;
  countryShortcode: string | null;
  postcodeId: string | null;
  postcodeText: string | null;
  placeId: string | null;
  placeWikidata: string | null;
  text: string;
  coordinates: string;
}

export type IUserObjectLocation = {
  location: ObjectField<IUserElasticLocationProperties>;
};

type IUserElasticLocationProperties = {
  [key in keyof IUserElasticLocation]: any;
};

/**
 * Tag
 */
export type IUserObjectTag = {
  tag: ObjectField<IElasticTagProperties & IUserObjectTagRef>;
};

type IElasticTagProperties = {
  [key in keyof IUserElasticTag]: any;
};

export interface IUserElasticTag {
  id: number;
  tagRef: IUserElasticTagRef;
}

/**
 * TagRef
 */

interface IUserElasticTagRef {
  id: number;
  text: string;
}

type IUserObjectTagRef = {
  tagRef: ObjectField<IUserElasticTagRefProperties>;
};

type IUserElasticTagRefProperties = {
  [key in keyof IUserElasticTagRef]: any;
};

/**
 * Profile Avatar
 */

export interface IUserAvatar {
  url: string | null;
  blurBase64: string | null;
}

export type IUserObjectAvatarImage = {
  avatar: ObjectField<IUserElasticAvatarProperties>;
};

type IUserElasticAvatarProperties = {
  [key in keyof IUserAvatar]: any;
};

/**
 * Review Meta
 */

export type IUserObjectReviewMeta = {
  reviewMeta: ObjectField<IUserElasticReviewMetaProperties>;
};

export interface IUserReviewMeta {
  averageRating: number;
  numberRating: number;
}

type IUserElasticReviewMetaProperties = {
  [key in keyof IUserReviewMeta]: any;
};
