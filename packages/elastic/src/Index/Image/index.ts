import { Logger } from '@sportsguide/lib';
import type { IImageWithLocation } from '@sportsguide/database';
import type {
  IImageDetailOutput,
  IImageElastic,
  IImageElasticDocument,
  IImageListOutput
} from '../../types/image';
import esClient from '../../client';
import { ConfigHandler } from '../../ConfigHandler';
import { ImageElasticMapper } from '../../Mapper/image';

export class ImageElastic implements IImageElastic {
  readIndex: string;

  writeIndex: string;

  constructor() {
    const indexType = 'image';

    this.readIndex = ConfigHandler.getReadAlias(indexType);
    this.writeIndex = ConfigHandler.getWriteAlias(indexType);
  }

  getImageList = async (
    userId: string,
    limit: number,
    cursor: string
  ): Promise<IImageListOutput> => {
    try {
      const response = await esClient.search<IImageElasticDocument>({
        index: this.readIndex,
        body: {
          sort: [{ id: { order: 'desc' } }],
          search_after: cursor ? [cursor] : undefined,
          size: limit + 1,
          query: {
            bool: {
              must: [
                {
                  match: {
                    user_id: userId
                  }
                }
              ]
            }
          }
        }
      });
      return { type: 'ImageListSuccess', output: response.body };
    } catch (error) {
      Logger.error('error', error);
      return { type: 'ImageListError' };
    }
  };

  getImageDetail = async (imageId: string): Promise<IImageDetailOutput> => {
    try {
      const response = await esClient.search<IImageElasticDocument>({
        index: this.readIndex,
        body: {
          sort: [{ id: { order: 'desc' } }],
          query: {
            bool: {
              must: [
                {
                  match: {
                    id: imageId
                  }
                }
              ]
            }
          }
        }
      });
      return { type: 'ImageDetailSuccess', output: response.body };
    } catch (error) {
      Logger.error('error', error);
      return { type: 'ImageDetailError' };
    }
  };

  /**
   * **ElasticSearch**\
   * Create the Image in ElasticSearch
   *
   * @param userId
   * @param imageId
   */
  createImage = async (image: IImageWithLocation): Promise<boolean> => {
    const mappedImage = ImageElasticMapper.mapImage(image);

    try {
      await esClient.update({
        index: this.writeIndex,
        id: image.id.toString(),
        body: {
          doc: {
            ...mappedImage
          },
          doc_as_upsert: true
        }
      });
      return true;
    } catch (error) {
      Logger.error('error', error);
      return false;
    }
  };
}
