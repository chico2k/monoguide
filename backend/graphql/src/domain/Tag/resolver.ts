import {
  Resolver,
  Mutation,
  Arg,
  Ctx,
  Int,
  Query,
  UseMiddleware
} from 'type-graphql';
import Container, { Service } from 'typedi';
import type { ITagWithTagRef } from '@sportsguide/database';
import { AuthProvider } from '@sportsguide/auth';
import { TagController } from './controller';
import Tag from './graph';
import type { IContext } from '../../lib/types';

@Service()
@Resolver()
export class TagResolver {
  tagController = Container.get(TagController);

  @UseMiddleware(AuthProvider)
  @Query(() => [Tag])
  async getTagList(@Ctx() ctx: IContext): Promise<ITagWithTagRef[]> {
    return this.tagController.getTagListController(ctx);
  }

  @UseMiddleware(AuthProvider)
  @Mutation(() => Boolean)
  async deleteTag(
    @Arg('tagId', () => Int) tagId: number,
    @Ctx() ctx: IContext
  ): Promise<boolean> {
    return this.tagController.deleteTagController(tagId, ctx);
  }

  @UseMiddleware(AuthProvider)
  @Mutation(() => Tag)
  async createTag(
    @Arg('tagRefId', () => Int) tagRefId: number,
    @Ctx() ctx: IContext
  ): Promise<ITagWithTagRef> {
    return this.tagController.createTagController(tagRefId, ctx);
  }
}
