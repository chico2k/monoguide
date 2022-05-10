import { Logger } from '@sportsguide/lib';
import type { IVitaDatabase } from '@sportsguide/database';
import { Inject, Service, Container } from 'typedi';
import { WebhookDatabaseMook, WebhookDatabase } from '@sportsguide/webhook';
import { ContainerInjection } from '../../lib/ContainerInjection';
import type {
  CreateVitaInput,
  ICreateVitaOutput,
  IUpdateVitaOutput,
  UpdateVitaInput
} from './types';
import type { IContext } from '../../lib/apolloServer/types';

@Service()
export class VitaService {
  webhook =
    process.env.NODE_ENV === 'test'
      ? Container.get(WebhookDatabaseMook)
      : Container.get(WebhookDatabase);

  constructor(
    @Inject(ContainerInjection.containerNames.DB_VITA)
    private readonly vitaDatabase: IVitaDatabase
  ) {}

  createVitaService = async (
    data: CreateVitaInput,
    ctx: IContext
  ): Promise<ICreateVitaOutput> => {
    try {
      const userId = ctx.auth.getUserId();

      const newVita = await this.vitaDatabase.createVita({
        userId,
        ...data
      });

      await this.webhook.createdVita(userId, newVita);

      return {
        type: 'CreateVitaSuccess',
        data: {
          vita: newVita
        }
      };
    } catch (error) {
      Logger.error('error', error);
      return {
        type: 'CreateVitaFailed'
      };
    }
  };

  deleteVitaService = async (id: number, ctx: IContext): Promise<boolean> => {
    try {
      const { userId } = ctx.auth.payload;
      const vita = await this.vitaDatabase.getVitaDetail(id);

      if (!vita) return false;

      if (vita.userId !== userId) return false;

      await this.vitaDatabase.deleteVita(id);

      await this.webhook.daletedVita(userId, id);

      return true;
    } catch (error) {
      Logger.error('error', error);
      return false;
    }
  };

  updateVitaService = async (
    data: UpdateVitaInput,
    ctx: IContext
  ): Promise<IUpdateVitaOutput> => {
    const { userId } = ctx.auth.payload;

    try {
      const vita = await this.vitaDatabase.getVitaDetail(data.id);
      if (!vita)
        return {
          type: 'UpdateVitaFailed'
        };

      if (vita.userId !== userId)
        return {
          type: 'UpdateVitaFailed'
        };

      const updateVita = await this.vitaDatabase.updateVita({
        userId,
        ...data
      });

      await this.webhook.updatedVita(userId, updateVita);
      return {
        type: 'UpdateVitaSuccess',
        data: {
          vita: updateVita
        }
      };
    } catch (error) {
      Logger.error('error', error);
      return {
        type: 'UpdateVitaFailed'
      };
    }
  };
}
