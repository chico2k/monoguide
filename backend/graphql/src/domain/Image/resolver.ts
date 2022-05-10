import {
  Resolver,
  Arg,
  Ctx,
  Mutation,
  Query,
  Int,
  UseMiddleware
} from 'type-graphql';
import Container from 'typedi';
import { AuthProvider } from '@sportsguide/auth';
import type { IContext } from "../../lib/apolloServer/types";
import { UploadResolverInput, UploadResolverResponse , ImageListResponse } from './types';
import { ImageController } from './controller';

@Resolver()
export class ImageResolver {
  imageController = Container.get(ImageController);

  @UseMiddleware(AuthProvider)
  @Mutation(() => UploadResolverResponse)
  async createUploadUrl(
    @Arg('data') data: UploadResolverInput,
    @Ctx() ctx: IContext
  ): Promise<UploadResolverResponse> {
    return this.imageController.createUploadImageController(data, ctx);
  }

  @UseMiddleware(AuthProvider)
  @Query(() => ImageListResponse)
  async getUploadImageList(
    @Arg('username') username: string,
    @Arg('limit', () => Int) limit: number,
    @Arg('cursor', { nullable: true }) cursor: string
  ): Promise<typeof ImageListResponse> {
    return this.imageController.getUploadImageListController(
      username,
      limit,
      cursor
    );
  }

  @UseMiddleware(AuthProvider)
  @Mutation(() => ImageListResponse)
  async getUploadImageDetail(
    @Arg('id') id: number
  ): Promise<typeof ImageListResponse> {
    return this.imageController.getUploadImageDetailController(id);
  }
}
