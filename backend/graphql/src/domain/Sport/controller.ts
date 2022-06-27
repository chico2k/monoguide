import { ValidationError } from 'apollo-server-lambda';
import type { ISportWithSportRef } from '@sportsguide/database';
import { Container, Service } from 'typedi';
import { SportService } from './service';
import type { IContext } from "../../lib/apolloServer/types";
import type { SportInput, SportUpdateInput } from './types';
import type { IVerfiySessionSuccess } from '@sportsguide/auth';

@Service()
class SportController {
  sportService = Container.get(SportService);

  createSportController = async (
    data: SportInput,
    ctx: IContext
  ): Promise<ISportWithSportRef> => {
    const sportOrError = await this.sportService.createSportService(data, ctx);

    switch (sportOrError.type) {
      case 'SportAlreadyExist':
        throw new ValidationError('SPORT_SERVICE_FAILED');
      case 'SportUnexpectedError':
        throw new ValidationError('SPORT_SERVICE_FAILED');
    }

    return sportOrError.sport;
  };

  deleteSportController = async (
    sportId: number,
    ctx: IContext
  ): Promise<boolean> => {
    const sportOrError = await this.sportService.deleteSportService(
      sportId,
      ctx
    );

    switch (sportOrError.type) {
      case 'SportNotOwner':
        throw new ValidationError('SPORT_SERVICE_FAILED');
      case 'SportUnexpectedError':
        throw new ValidationError('SPORT_SERVICE_FAILED');
    }

    return true;
  };

  getSportDetailController = async (
    sportId: number,
    ctx: IContext
  ): Promise<ISportWithSportRef> => {
    const sportOrError = await this.sportService.getSportDetailService(
      sportId,
      ctx
    );
    switch (sportOrError.type) {
      case 'SportNotOwner':
        throw new ValidationError('SPORT_SERVICE_FAILED');
      case 'SportUnexpectedError':
        throw new ValidationError('SPORT_SERVICE_FAILED');
    }
    return sportOrError.sport;
  };

  updateSportController = async (
    data: SportUpdateInput,
    ctx: IContext
  ): Promise<ISportWithSportRef> => {
    const sportOrError = await this.sportService.updateSportService(data, ctx);

    switch (sportOrError.type) {
      case 'SportNotOwner':
        throw new ValidationError('SPORT_SERVICE_FAILED');
      case 'SportUnexpectedError':
        throw new ValidationError('SPORT_SERVICE_FAILED');
    }

    return sportOrError.sport;
  };
}

export { SportController };
