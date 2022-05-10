import type { ISportRefDatabase } from '@sportsguide/database';
import { Logger } from '@sportsguide/lib';
import { Inject, Service } from 'typedi';
import type { IContext } from "../../lib/apolloServer/types";
import { ContainerInjection } from '../../lib/ContainerInjection';
import type { IGetSportRefListOutput } from './types';

@Service()
export class SportRefService {
  constructor(
    @Inject(ContainerInjection.containerNames.DB_SPORTREF)
    private readonly sportRefDatabase: ISportRefDatabase
  ) {}

  getSportRefListService = async (
    ctx: IContext
  ): Promise<IGetSportRefListOutput> => {
    try {
      const {userId} = ctx.auth.payload;
      const sportRef = await this.sportRefDatabase.getSportRefUser(userId);

      return {
        type: 'GetSportRefSuccess',
        data: {
          sportRef
        }
      };
    } catch (error) {
      Logger.error('error', error);

      return {
        type: 'GetSportRefFail'
      };
    }
  };
}
