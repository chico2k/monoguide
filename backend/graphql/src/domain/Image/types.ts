import { InputType, Field, ObjectType } from 'type-graphql';
import type { IImageElasticSearchResponse } from '@sportsguide/elastic';
import { ILocationMapBox, LocationMapBox } from "../Location/types";
import { Image } from './graph';
import ElasticResponse from '../../lib/types';

export interface ICreateUploadInput {
  uploadType: string;
  fileName: string;
  mimeType: string;
  origin: string;
  isProfileImage: boolean;
  caption: string;
  location: ILocationMapBox;
}

export type ICreateUploadOutput =
  | ICreateUploadOutputFail
  | ICreateUploadOutputSuccess;

export type ICreateUploadOutputSuccess = {
  type: 'CreateUploadSuccess';
  data: UploadResolverOutput;
};

export interface ICreateUploadOutputFail {
  type: 'CreateUploadFail';
}

@InputType()
export class UploadResolverInput {
  @Field(() => String)
  uploadType: string;

  @Field(() => String)
  fileName: string;

  @Field(() => String)
  mimeType: string;

  @Field(() => String)
  origin: string;

  @Field(() => Boolean)
  isProfileImage: boolean;

  @Field(() => String, { nullable: true })
  caption: string;

  @Field(() => LocationMapBox, { nullable: true })
  location: LocationMapBox;
}
export type UploadResolverOutput = { signedUrl: string; fileKey: string };

@ObjectType('UploadResolverResponse')
export class UploadResolverResponse implements UploadResolverOutput {
  @Field()
  signedUrl: string;

  @Field()
  fileKey: string;
}

export const ImageListResponse = ElasticResponse(Image);

export type IPageInfo = {
  cursor: string | undefined;
  lastPage: string;
  nextPage: boolean;
};

export type IImageElasticSearchResponseWithPagingation =
  IImageElasticSearchResponse & { pageInfo: IPageInfo };

export type IGetUploadImageListOutput =
  | IGetUploadImageListFail
  | IGetUploadImageListSuccess;

export type IGetUploadImageListSuccess = {
  type: 'GetUploadImageListSuccess';
  data: {
    images: typeof ImageListResponse;
  };
};
export type IGetUploadImageListFail = { type: 'GetUploadImageListFail' };

export type IGetImageDetailOutput =
  | IGetImageDetailSuccess
  | IGetImageDetailFail;

export type IGetImageDetailSuccess = {
  type: 'GetUploadImageDetailSuccess';
  data: {
    image: IImageElasticSearchResponse;
  };
};
export type IGetImageDetailFail = { type: 'GetUploadImageDetailFail' };
