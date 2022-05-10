import { Resolver, Mutation, Arg, UseMiddleware, Ctx, Int } from 'type-graphql';
import Container, { Service } from 'typedi';
import { AuthProvider } from '@sportsguide/auth';
import type { IContext } from "../../lib/apolloServer/types";
import { CreateVitaInput, UpdateVitaInput } from './types';
import Vita from './graph';
import { VitaController } from './controller';

@Service()
@Resolver()
export class VitaResolver {
  vitaController = Container.get(VitaController);

  @UseMiddleware(AuthProvider)
  @Mutation(() => Vita)
  async createVita(
    @Arg('data') data: CreateVitaInput,
    @Ctx() ctx: IContext
  ): Promise<Vita> {
    return this.vitaController.createVitaController(data, ctx);
  }

  @UseMiddleware(AuthProvider)
  @Mutation(() => Boolean)
  async deleteVita(
    @Arg('id', () => Int) id: number,
    @Ctx() ctx: IContext
  ): Promise<boolean> {
    return this.vitaController.deleteVitaController(id, ctx);
  }

  @UseMiddleware(AuthProvider)
  @Mutation(() => Vita)
  async updateVita(
    @Arg('data') data: UpdateVitaInput,
    @Ctx() ctx: IContext
  ): Promise<Vita> {
    return this.vitaController.updateVitaController(data, ctx);
  }
}
