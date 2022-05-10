import { ValidationError } from 'apollo-server-lambda';
import Container, { Service } from 'typedi';
import type { ITagWithTagRef } from '@sportsguide/database';
import { TagService } from './service';
import type { IContext } from '../../lib/types';

@Service()
class TagController {
  tagService = Container.get(TagService);

  getTagListController = async (ctx: IContext): Promise<ITagWithTagRef[]> => {
    const tagOrError = await this.tagService.getTagListService(ctx);

    switch (tagOrError.type) {
      case 'GetTagListSucess':
        return tagOrError.data.tag;

      case 'GetTagListFail':
        throw new ValidationError('TAG_SERVICE_FAILED');
    }
  };

  deleteTagController = async (
    tagId: number,
    ctx: IContext
  ): Promise<boolean> => this.tagService.deleteTagService(tagId, ctx);

  createTagController = async (
    tagId: number,
    ctx: IContext
  ): Promise<ITagWithTagRef> => {
    const tagOrError = await this.tagService.createTagService(tagId, ctx);

    switch (tagOrError.type) {
      case 'GetTagCreateSucess':
        return tagOrError.data.tag;

      case 'GetTagCreateFail':
        throw new ValidationError('TAG_SERVICE_FAILED');
    }
  };
}

export { TagController };
