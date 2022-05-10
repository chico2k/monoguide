import { ValidationError } from 'apollo-server-lambda';
import { produce } from 'immer';
import type { IImageDatabase, IUserDatabase } from '@sportsguide/database';
import { Uploader, Logger } from '@sportsguide/lib';
import type { UploaderTypes } from '@sportsguide/lib';
import type {
  IImageElasticSearchResponse,
  IImageElastic
} from '@sportsguide/elastic';
import { Inject, Service } from 'typedi';
import type { IContext } from '../../lib/apolloServer/types';
import type {
  ICreateUploadOutput,
  ICreateUploadInput,
  IPageInfo,
  IImageElasticSearchResponseWithPagingation,
  IGetUploadImageListOutput,
  IGetImageDetailOutput
} from './types';
import { ContainerInjection } from '../../lib/ContainerInjection';

@Service()
export class ImageService {
  constructor(
    @Inject(ContainerInjection.containerNames.DB_USER)
    private readonly userDatabase: IUserDatabase,
    @Inject(ContainerInjection.containerNames.DB_IMAGE)
    private readonly imageDatabase: IImageDatabase,
    @Inject(ContainerInjection.containerNames.ES_IMAGE)
    private readonly elasticImage: IImageElastic
  ) {}

  createUploadImageService = async (
    data: ICreateUploadInput,
    ctx: IContext
  ): Promise<ICreateUploadOutput> => {
    try {
      const {
        uploadType,
        fileName,
        mimeType,
        origin,
        caption,
        location,
        isProfileImage
      } = data;

      const userId = ctx.auth.getUserId();

      const newFileName = Uploader.generateFileName();
      const image = await this.imageDatabase.createImage({
        userId,
        origin,
        isProfileImage,
        caption,
        location,
        fileName: newFileName
      });

      const url = await Uploader.getUploadURL({
        userId,
        uploadType: uploadType as UploaderTypes,
        fileName,
        mimeType,
        newFileName,
        itemId: image.id
      });

      return { type: 'CreateUploadSuccess', data: { ...url } };
    } catch (error) {
      Logger.error(error);
      return { type: 'CreateUploadFail' };
    }
  };

  getUploadImageListService = async (
    username: string,
    limit: number,
    cursor: string
  ): Promise<IGetUploadImageListOutput> => {
    try {
      const user = await this.userDatabase.getUserByUsername(username);
      const bodyOrError = await this.elasticImage.getImageList(
        user.id,
        limit,
        cursor
      );

      switch (bodyOrError.type) {
        case 'ImageListError':
          throw new ValidationError('SPORT_SERVICE_FAILED');
      }

      const transformedResponse = this.addPaginationInformation(
        bodyOrError.output,
        cursor,
        limit
      );

      return {
        type: 'GetUploadImageListSuccess',
        data: {
          images: transformedResponse
        }
      };
    } catch (error) {
      Logger.error('error', error);
      return { type: 'GetUploadImageListFail' };
    }
  };

  private addPaginationInformation = (
    body: IImageElasticSearchResponse,
    currentCursor: string,
    limit: number
  ): IImageElasticSearchResponseWithPagingation => {
    try {
      const lengthResponse = body.hits.hits.slice(0, limit - 1).length;
      const openItems = body.hits.hits.slice(limit - 1).length;
      const hits = body.hits.hits.slice(0, limit - 1);
      const nextPage = !!openItems;

      const cursor = nextPage
        ? (body.hits.hits[lengthResponse - 1]._id as string)
        : undefined;

      const pageInfo: IPageInfo = {
        cursor,
        lastPage: currentCursor,
        nextPage
      };

      const preResult = produce(body, (draft) => {
        draft.hits.hits = hits;
      });

      return {
        ...preResult,
        pageInfo
      };
    } catch (error) {
      Logger.error('error', error);
      throw error;
    }
  };

  getUploadImageDetailService = async (
    id: number
  ): Promise<IGetImageDetailOutput> => {
    try {
      const imageOrError = await this.elasticImage.getImageDetail(`${id}`);

      if (imageOrError.type === 'ImageDetailError')
        return {
          type: 'GetUploadImageDetailFail'
        };

      return {
        type: 'GetUploadImageDetailSuccess',
        data: { image: imageOrError.output }
      };
    } catch (error) {
      Logger.error('error', error);
      return {
        type: 'GetUploadImageDetailFail'
      };
    }
  };
}
