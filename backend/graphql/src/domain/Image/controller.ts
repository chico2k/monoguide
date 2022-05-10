import type { IImageElasticSearchResponse } from '@sportsguide/elastic';
import { ApolloError } from 'apollo-server';
import Container, { Service } from 'typedi';
import type { IContext } from "../../lib/apolloServer/types";
import { ImageService } from './service';
import type {
  ICreateUploadInput,
  ImageListResponse,
  UploadResolverOutput
} from './types';

@Service()
class ImageController {
  imageService = Container.get(ImageService);

  createUploadImageController = async (
    data: ICreateUploadInput,
    ctx: IContext
  ): Promise<UploadResolverOutput> => {
    const imageInputOrError = await this.imageService.createUploadImageService(
      data,
      ctx
    );
    switch (imageInputOrError.type) {
      case 'CreateUploadSuccess':
        return imageInputOrError.data;
      case 'CreateUploadFail':
        throw new ApolloError('IMAGE_SERVICE_FAILED');
    }
  };

  getUploadImageListController = async (
    username: string,
    limit: number,
    cursor: string
  ): Promise<typeof ImageListResponse> => {
    const imagesOrError = await this.imageService.getUploadImageListService(
      username,
      limit,
      cursor
    );

    switch (imagesOrError.type) {
      case 'GetUploadImageListSuccess':
        return imagesOrError.data.images;
      case 'GetUploadImageListFail':
        throw new ApolloError('IMAGE_SERVICE_FAILED');
    }
  };

  getUploadImageDetailController = async (
    id: number
  ): Promise<IImageElasticSearchResponse> => {
    const imageOrError = await this.imageService.getUploadImageDetailService(
      id
    );

    switch (imageOrError.type) {
      case 'GetUploadImageDetailSuccess':
        return imageOrError.data.image;
      case 'GetUploadImageDetailFail':
        throw new ApolloError('IMAGE_SERVICE_FAILED');
    }
  };
}

export { ImageController };
