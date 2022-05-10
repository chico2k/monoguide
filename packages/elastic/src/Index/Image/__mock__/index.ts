import type { IImageWithLocation } from '@sportsguide/database';
import { produce } from 'immer';
import type {
  IImageElastic,
  IImageElasticDocument,
  IImageElasticSearchResponse
} from '../../..';
import { ImageElasticMapper } from '../../../Mapper/image';
import type {
  IImageListOutput,
  IImageDetailOutput
} from '../../../types/image';

class ImageElasticMock implements IImageElastic {
  images: IImageElasticDocument[] = [];

  private convertImagesToSearchResponse = (
    images: IImageElasticDocument[]
  ): IImageElasticSearchResponse => {
    const searchResponse = {
      took: 1,
      timed_out: false,
      _shards: {
        failed: 0,
        successful: 1,
        total: 1,
        skipped: 0
      },
      hits: {
        hits: this.convertImages(images),
        total: this.images.length
      }
    };

    return searchResponse;
  };

  private convertImages = (images: IImageElasticDocument[]) => {
    const convertedImage = images.map((image) => ({
        _id: `${image.id  }`,
        _index: 'image',
        _source: { ...image }
      }));
    return convertedImage;
  };

  getImageList = async (
    userId: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _limit: number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _cursor: string
  ): Promise<IImageListOutput> => {
    const index = this.images.findIndex((image) => image.user_id === userId);

    if (index === -1)
      return {
        type: 'ImageListError'
      };

    return {
      type: 'ImageListSuccess',
      output: this.convertImagesToSearchResponse([this.images[index]])
    };
  };

  getImageDetail = async (imageId: string): Promise<IImageDetailOutput> => {
    const index = this.images.findIndex((image) => image.user_id === imageId);

    if (index === -1)
      return {
        type: 'ImageDetailError'
      };
    return {
      type: 'ImageDetailSuccess',
      output: this.convertImagesToSearchResponse([this.images[index]])
    };
  };

  createImage = async (image: IImageWithLocation): Promise<boolean> => {
    const mappedImage = ImageElasticMapper.mapImage(image);
    this.images = produce(this.images, (draft) => {
      draft.push(mappedImage);
    });
    return true;
  };
}

export { ImageElasticMock };
