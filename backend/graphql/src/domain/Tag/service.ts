import { ValidationError } from 'apollo-server-lambda';
import { Logger } from '@sportsguide/lib';
import { Inject, Service } from 'typedi';
import type { ITagDatabase } from '@sportsguide/database';
import { ContainerInjection } from '../../lib/ContainerInjection';
import type { IGetTagCreateOutput, IGetTagListOutput } from './types';
import type { IContext } from '../../lib/types';

@Service()
export class TagService {
  constructor(
    @Inject(ContainerInjection.containerNames.DB_TAG)
    private readonly tagDatabase: ITagDatabase
  ) {}

  getTagListService = async (ctx: IContext): Promise<IGetTagListOutput> => {
    const { userId } = ctx.auth.payload;

    try {
      const tag = await this.tagDatabase.getTagList({ userId });
      return {
        type: 'GetTagListSucess',
        data: {
          tag
        }
      };
    } catch (error) {
      Logger.error('error', error);
      return {
        type: 'GetTagListFail'
      };
    }
  };

  deleteTagService = async (tagId: number, ctx: IContext): Promise<boolean> => {
    const { userId } = ctx.auth.payload;
    try {
      const tag = await this.tagDatabase.getTagDetail(tagId);
      if (tag.userId !== userId) return false;

      await this.tagDatabase.deleteTag(tagId);

      return true;
    } catch (error) {
      Logger.error('error', error);
      return false;
    }
  };

  createTagService = async (
    tagRefId: number,
    ctx: IContext
  ): Promise<IGetTagCreateOutput> => {
    const { userId } = ctx.auth.payload;

    try {
      const exists = await this.tagDatabase.checkTagExists(userId, tagRefId);
      if (exists) throw new ValidationError('TAG_USER_SERVICE_FAILED');

      const tag = await this.tagDatabase.createTag({ tagRefId, userId });

      return {
        type: 'GetTagCreateSucess',
        data: {
          tag
        }
      };
    } catch (error) {
      Logger.error('error', error);
      return {
        type: 'GetTagCreateFail'
      };
    }
  };
}
