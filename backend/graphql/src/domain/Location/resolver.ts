import { Resolver, Arg, Mutation, Ctx, UseMiddleware } from 'type-graphql';
import Container from 'typedi';
import { AuthProvider } from '@sportsguide/auth';
import type { IContext } from "../../lib/apolloServer/types";
import { LocationMapBox, ILocationMapBox } from './types';
import Location from './graph';
import { LocationController } from './controller';

@Resolver()
export class LocationResolver {
  locationController = Container.get(LocationController);

  @Mutation(() => [LocationMapBox])
  async getLocation(@Arg('value') value: string): Promise<LocationMapBox> {
    return this.locationController.getLocationController(value);
  }

  @UseMiddleware(AuthProvider)
  @Mutation(() => Location)
  async createLocation(
    @Arg('data', () => LocationMapBox)
    data: ILocationMapBox,
    @Ctx() ctx: IContext
  ): Promise<Location> {
    return this.locationController.createLocationController(data, ctx);
  }
}
