import Container, { Service } from 'typedi';
import { ApolloError } from 'apollo-server';
import { AvatarService } from './services';
import type { Avatar } from './graph';
import type { IContext } from '../../lib/apolloServer/types';

@Service()
class AvatarController {
  avatarService = Container.get(AvatarService);

  setExistingImageAsAvatarController = async (
    imageId: number,
    ctx: IContext
  ): Promise<Avatar> => {
    const avatarOrError =
      await this.avatarService.setExistingImageAsAvatarService(imageId, ctx);

    switch (avatarOrError.type) {
      case 'SetAvatarSuccess':
        return avatarOrError.data;
      case 'SetAvatarFail':
        throw new ApolloError('AVATAR_SERVICE_FAILED');
    }
  };
}

export { AvatarController };
