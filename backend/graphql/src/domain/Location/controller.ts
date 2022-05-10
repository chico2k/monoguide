import Container, { Service } from 'typedi';
import { ValidationError } from 'apollo-server';
import type { Location as LocationDB } from '@prisma/client';
import { LocationService } from './service';
import type { LocationMapBox } from './types';
import type { IContext } from '../../lib/apolloServer/types';

@Service()
class LocationController {
  locationService = Container.get(LocationService);

  getLocationController = async (value: string): Promise<LocationMapBox> => {
    const locationOrError = await this.locationService.getLocationService(
      value
    );

    switch (locationOrError.type) {
      case 'GetLocationSuccess':
        return locationOrError.data.locationMapbox;
      case 'GetLocationFail':
        throw new ValidationError('LOCATION_SERVICE_FAILED');
    }
  };

  createLocationController = async (
    data: LocationMapBox,
    ctx: IContext
  ): Promise<LocationDB> => {
    const locationOrError = await this.locationService.createLocationService(
      data,
      ctx
    );
    switch (locationOrError.type) {
      case 'CreateLocationSuccess':
        return locationOrError.data.location;
      case 'CreateLocationFail':
        throw new ValidationError('LOCATION_SERVICE_FAILED');
    }
  };
}

export { LocationController };
