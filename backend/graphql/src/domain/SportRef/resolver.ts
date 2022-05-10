import { Resolver, Query, Ctx, UseMiddleware } from 'type-graphql';
import Container from 'typedi';
import { AuthProvider } from '@sportsguide/auth';
import type { IContext } from '../../lib/apolloServer/types';
import SportRef from './graph';
import { SportRefController } from './controller';

@Resolver()
export class SportRefResolver {
  sportRefcontroller = Container.get(SportRefController);

  @UseMiddleware(AuthProvider)
  @Query(() => [SportRef], { nullable: true })
  async getSportRefList(@Ctx() ctx: IContext): Promise<SportRef[] | undefined> {
    return this.sportRefcontroller.getSportRefListController(ctx);
  }
}
