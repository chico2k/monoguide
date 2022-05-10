import { Logger } from '@sportsguide/lib';
import type { Location } from '@prisma/client';
import type { ILocationMapBox, ILocationDatebase } from './types';
import prismaClient from '../../lib/prisma';
import { LocationHelper } from './LocationHelper';

class LocationDatabase implements ILocationDatebase {
  createLocation = async (
    userId: string,
    location: ILocationMapBox
  ): Promise<Location> => {
    const createPayload = LocationHelper.getLocationMapping(userId, location);

    try {
      return await prismaClient.location.create(createPayload);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  };

  deleteLocation = async (locationId: number): Promise<boolean> => {
    try {
      await prismaClient.location.delete({
        where: {
          id: locationId
        }
      });
      return true;
    } catch (error) {
      Logger.error(error);
      return false;
    }
  };
}

export { LocationDatabase };
