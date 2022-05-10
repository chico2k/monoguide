/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SearchResponse } from '@elastic/elasticsearch/api/types';
import type { IImageWithLocation } from '@sportsguide/database';
import type { IIndexBody, ObjectField } from '.';

/**
 * Image Elastic
 */
export interface IImageElastic {
  getImageList: (
    userId: string,
    limit: number,
    cursor: string
  ) => Promise<IImageListOutput>;

  getImageDetail: (imageId: string) => Promise<IImageDetailOutput>;
  createImage: (image: IImageWithLocation) => Promise<boolean>;
}

/**
 * Image Methods
 */
interface IImageListError {
  type: 'ImageListError';
}

interface IImageListSuccess {
  type: 'ImageListSuccess';
  output: IImageElasticSearchResponse;
}

export type IImageListOutput = IImageListSuccess | IImageListError;

interface IImageDetailSuccess {
  type: 'ImageDetailSuccess';
  output: IImageElasticSearchResponse;
}

interface IImageDetailError {
  type: 'ImageDetailError';
}

export type IImageDetailOutput = IImageDetailSuccess | IImageDetailError;

/**
 * Image Index
 */
export interface IImageIndex {
  name: string;
  body: IIndexBody<IImageIndexMapping>;
}

interface IImageIndexMapping {
  dynamic: string;
  properties: IImageProperties & IImagePropertiesLocation;
}

export type IImageElasticSearchResponse = SearchResponse<IImageElasticDocument>;

/**
 * Image
 */

export interface IImageElasticDocument {
  id: number;
  user_id: string;
  orderNumber: number | null;
  caption: string | null;
  isProfileImage: boolean;
  origin: string;
  fileName: string | null;
  url: string | null;
  blurBase64: string | null;
  createdAt: Date;

  location?: IImageLocationElastic | undefined;
}

type IImageProperties = {
  [key in keyof IImageElasticDocument]: any;
};

/**
 * Location
 */

interface IImageLocationElastic {
  id: number;
  mapboxId: string;
  placeName: string;
  placeType: string;
  coordinates: string;
  text: string;
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
  placeText: string | null;
}

type IImagePropertiesLocation = {
  location: ObjectField<IImageLocationProperties>;
};

type IImageLocationProperties = {
  [key in keyof IImageLocationElastic]: any;
};
