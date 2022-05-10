import { Logger } from '@sportsguide/lib';
import type { ITagRefDatabase } from '@sportsguide/database';
import { Service, Inject } from 'typedi';
import type { IGetTagListOutput, ICreateTagOutput } from './types';

import { ContainerInjection } from '../../lib/ContainerInjection';

@Service()
class TagRefService {
  constructor(
    @Inject(ContainerInjection.containerNames.DB_TAGREF)
    private readonly tagRefDatabase: ITagRefDatabase
  ) {}

  getTagRefListService = async (): Promise<IGetTagListOutput> => {
    try {
      const tagRef = await this.tagRefDatabase.getTagList();

      return {
        type: 'GetTagListSuccess',
        data: {
          tagRef
        }
      };
    } catch (error) {
      Logger.error('error', error);
      return {
        type: 'GetTagListFail'
      };
    }
  };

  createTagRefService = async (text: string): Promise<ICreateTagOutput> => {
    try {
      const tagRef = await this.tagRefDatabase.createTag({ text });

      return {
        type: 'CreateTagSuccess',
        data: {
          tagRef
        }
      };
    } catch (error) {
      Logger.error('error', error);
      return {
        type: 'CreateTagFail'
      };
    }
  };
}

export { TagRefService };
