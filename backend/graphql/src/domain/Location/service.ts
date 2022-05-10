import type { ILocationDatebase } from '@sportsguide/database';
import axios from 'axios';
import { Logger } from '@sportsguide/lib';
import { Inject, Service } from 'typedi';
import type { IContext } from '../../lib/apolloServer/types';
import type {
  ICreateLocationOutput,
  IGetLocationOutput,
  LocationContext,
  ILocationCustomContext,
  LocationMapBox
} from './types';
import { ContainerInjection } from '../../lib/ContainerInjection';

@Service()
export class LocationService {
  constructor(
    @Inject(ContainerInjection.containerNames.DB_LOCATION)
    private readonly locationDatabase: ILocationDatebase
  ) {}

  getLocationService = async (value: string): Promise<IGetLocationOutput> => {
    try {
      const locationMapbox = await this.getLocationFromExternalService(value);

      return {
        type: 'GetLocationSuccess',
        data: {
          locationMapbox
        }
      };
    } catch (error) {
      Logger.error('error', error);
      return { type: 'GetLocationFail' };
    }
  };

  createLocationService = async (
    data: LocationMapBox,
    ctx: IContext
  ): Promise<ICreateLocationOutput> => {
    try {
      const userId = ctx.auth.getUserId();

      const location = await this.locationDatabase.createLocation(userId, data);

      return { type: 'CreateLocationSuccess', data: { location } };
    } catch (error) {
      Logger.error('error', error);

      return { type: 'CreateLocationFail' };
    }
  };

  /**
   * Transform the MapBox Context of a Location to separate fields
   *
   * @param context
   */
  contextHandler = (context: LocationContext[]): ILocationCustomContext => {
    if (context == null) return { region: undefined, country: undefined };
    const updateContext: ILocationCustomContext = {};

    context.map((item: LocationContext): ILocationCustomContext => {
      if (item.id.split('.')[0] === 'region') {
        updateContext.region = {
          id: item.id.split('.')[1],
          text: item.text
        };
      }
      if (item.id.split('.')[0] === 'country') {
        updateContext.country = {
          id: item.id.split('.')[1],
          text: item.text
        };
      }
      return updateContext;
    });
    return updateContext;
  };

  /**
   * API to query MapBox API and get Locations
   *
   * @param value - the search value
   * @returns Search Result from MapBox API
   */
  getLocationFromExternalService = async (
    value: string
  ): Promise<LocationMapBox> => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?access_token=${process.env.MAPBOX_KEY}&limit=8&types=region,place,neighborhood,address,poi`;

    const {
      data: { features }
    } = await axios.get(url);

    return features;
  };
}
