import {
  Resolver,
  Mutation,
  Arg,
  Ctx,
  Query,
  Int,
  UseMiddleware
} from 'type-graphql';
import { Container, Service } from 'typedi';
import { AuthProvider } from '@sportsguide/auth';
import type { IContext } from "../../lib/apolloServer/types";
import { SportInput, SportUpdateInput } from './types';
import Sport from './graph';
import { SportController } from './controller';

@Service()
@Resolver()
export class SportResolver {
  sportcontroller = Container.get(SportController);

  @UseMiddleware(AuthProvider)
  @Mutation(() => Sport)
  async createSport(
    @Arg('data') data: SportInput,
    @Ctx() ctx: IContext
  ): Promise<Sport> {
    return this.sportcontroller.createSportController(data, ctx);
  }

  @UseMiddleware(AuthProvider)
  @Mutation(() => Boolean)
  async deleteSport(
    @Arg('sportId', () => Int) sportId: number,
    @Ctx() ctx: IContext
  ): Promise<boolean> {
    return this.sportcontroller.deleteSportController(sportId, ctx);
  }

  @UseMiddleware(AuthProvider)
  @Query(() => Sport)
  async getSportDetail(
    @Arg('sportId', () => Int) sportId: number,
    @Ctx() ctx: IContext
  ): Promise<Sport> {
    return this.sportcontroller.getSportDetailController(sportId, ctx);
  }

  @UseMiddleware(AuthProvider)
  @Mutation(() => Sport)
  async updateSport(
    @Arg('data') data: SportUpdateInput,
    @Ctx() ctx: IContext
  ): Promise<Sport> {
    return this.sportcontroller.updateSportController(data, ctx);
  }
}
