import type { IImageDatabase } from '@sportsguide/database';
import { Logger } from '@sportsguide/lib';
import { Service, Inject } from 'typedi';
import type { IContext } from '../../lib/apolloServer/types';
import { ContainerInjection } from '../../lib/ContainerInjection';
import type { ISetAvatarOutput } from './types';

@Service()
export class AvatarService {
  constructor(
    @Inject(ContainerInjection.containerNames.DB_IMAGE)
    private readonly imageDatabase: IImageDatabase
  ) {}

  setExistingImageAsAvatarService = async (
    imageId: number,
    ctx: IContext
  ): Promise<ISetAvatarOutput> => {
    try {
      const userId = ctx.auth.getUserId();

      if (!userId) {
        return {
          type: 'SetAvatarFail'
        };
      }
      const image = await this.imageDatabase.getImageDetail(imageId);

      if (image.userId !== userId) {
        return {
          type: 'SetAvatarFail'
        };
      }
      const currentProfileImages =
        await this.imageDatabase.getCurrentAvatarImages(userId);
      await this.imageDatabase.removeExistingAvatarImages(currentProfileImages);
      await this.imageDatabase.setExistingImageAsAvatar(imageId);

      if (!image.url || !image.blurBase64)
        return {
          type: 'SetAvatarFail'
        };

      return {
        type: 'SetAvatarSuccess',
        data: {
          url: image.url,
          blurBase64: image.blurBase64
        }
      };
    } catch (error) {
      Logger.error('error', error);
      return {
        type: 'SetAvatarFail'
      };
    }
  };
}
