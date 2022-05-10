import type { ISportDatabase } from '@sportsguide/database';
import { Logger } from '@sportsguide/lib';
import type { IWebhookDatabase } from '@sportsguide/webhook';
import { Service, Inject } from 'typedi';
import type { IContext } from '../../lib/apolloServer/types';
import type {
  ISportCreate,
  ISportDelete,
  ISportDetail,
  ISportUpdate,
  SportInput,
  SportUpdateInput
} from './types';
import { ContainerInjection } from '../../lib/ContainerInjection';

@Service()
export class SportService {
  constructor(
    @Inject(ContainerInjection.containerNames.DB_SPORT)
    private readonly sportDatabase: ISportDatabase,
    @Inject(ContainerInjection.containerNames.WEBHOOK_DATABASE)
    private readonly webhookDatabase: IWebhookDatabase
  ) {}

  createSportService = async (
    data: SportInput,
    ctx: IContext
  ): Promise<ISportCreate> => {
    const { sportRefId, level } = data;

    const userId = ctx.auth.getUserId();
    try {
      const exists = await this.sportDatabase.checkSportExists({
        sportRefId,
        userId
      });

      if (exists)
        return {
          type: 'SportAlreadyExist'
        };

      const sport = await this.sportDatabase.createSport({
        level,
        sportRefId,
        userId
      });

      // Fire Webhook
      await this.webhookDatabase.createdSport(userId, sport);

      return {
        type: 'SportCreateSuccess',
        sport
      };
    } catch (error) {
      Logger.error('error', error);
      return {
        type: 'SportUnexpectedError'
      };
    }
  };

  deleteSportService = async (
    sportId: number,
    ctx: IContext
  ): Promise<ISportDelete> => {
    try {
      const userId = ctx.auth.getUserId();

      const sport = await this.sportDatabase.getSportDetail(sportId);

      if (!sport)
        return {
          type: 'SportUnexpectedError'
        };

      if (sport.userId !== userId)
        return {
          type: 'SportNotOwner'
        };
      await this.sportDatabase.deleteSport(sportId);
      // Fire Webhook
      await this.webhookDatabase.deletedSport(userId, sportId);

      return {
        type: 'SportDeleteSuccess'
      };
    } catch (error) {
      Logger.error('error', error);
      return {
        type: 'SportUnexpectedError'
      };
    }
  };

  getSportDetailService = async (
    sportId: number,
    ctx: IContext
  ): Promise<ISportDetail> => {
    const userId = ctx.auth.getUserId();

    try {
      const sport = await this.sportDatabase.getSportDetail(sportId);

      if (!sport)
        return {
          type: 'SportUnexpectedError'
        };

      if (sport.userId !== userId)
        return {
          type: 'SportNotOwner'
        };

      return {
        type: 'SportDetailSuccess',
        sport
      };
    } catch (error) {
      Logger.error('error', error);
      return {
        type: 'SportUnexpectedError'
      };
    }
  };

  updateSportService = async (
    data: SportUpdateInput,
    ctx: IContext
  ): Promise<ISportUpdate> => {
    const { sportId, level } = data;

    const userId = ctx.auth.getUserId();

    try {
      const sport = await this.sportDatabase.getSportDetail(sportId);
      if (!sport)
        return {
          type: 'SportUnexpectedError'
        };

      if (sport.userId !== userId)
        return {
          type: 'SportNotOwner'
        };

      const updatedSport = await this.sportDatabase.updateSport({
        sportId,
        level
      });

      // Fire Webhook
      await this.webhookDatabase.updatedSport(userId, updatedSport);

      return {
        type: 'SportUpdateSuccess',
        sport: updatedSport
      };
    } catch (error) {
      Logger.error('error', error);
      return {
        type: 'SportUnexpectedError'
      };
    }
  };
}
