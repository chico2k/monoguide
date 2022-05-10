import Container, { Service } from 'typedi';
import type { SportRef as SportRefDB } from '@prisma/client';
import { ValidationError } from 'apollo-server';
import type { IContext } from "../../lib/apolloServer/types";

import { SportRefService } from './service';

@Service()
class SportRefController {
  sportRefService = Container.get(SportRefService);

  getSportRefListController = async (ctx: IContext): Promise<SportRefDB[]> => {
    const sportRefOrError = await this.sportRefService.getSportRefListService(
      ctx
    );
    switch (sportRefOrError.type) {
      case 'GetSportRefSuccess':
        return sportRefOrError.data.sportRef;
      case 'GetSportRefFail':
        throw new ValidationError('SPORT_TYP_SERVICE_FAILED');
    }
  };
}

export { SportRefController };
