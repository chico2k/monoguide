import { Resolver, Arg, Ctx, Mutation, UseMiddleware } from 'type-graphql';
import Container, { Service } from 'typedi';
import { AuthProvider } from '@sportsguide/auth';
import type { IContext } from "../../lib/apolloServer/types";
import { Avatar } from './graph';
import { AvatarController } from './controller';

@Service()
@Resolver()
export class AvatarResolver {
  avatarController = Container.get(AvatarController);

  @UseMiddleware(AuthProvider)
  @Mutation(() => Avatar)
  async setExistingImageAsAvatar(
    @Arg('imageId') imageId: number,
    @Ctx() ctx: IContext
  ): Promise<Avatar> {
    return this.avatarController.setExistingImageAsAvatarController(
      imageId,
      ctx
    );
  }
}
