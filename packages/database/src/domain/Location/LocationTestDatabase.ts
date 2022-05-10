import type { Location } from '@prisma/client';
import { produce } from 'immer';
import type { ILocationDatebase, ILocationMapBox } from './types';
import { LocationHelper } from './LocationHelper';
import { LocationTestFactory } from './LocationTestFactory';

class LocationTestDatabase implements ILocationDatebase {
  locations: Location[] = [];

  getLocations = () => this.locations;

  createLocation = async (
    userId: string,
    location: ILocationMapBox
  ): Promise<Location> => {
    const createPayload = LocationHelper.getLocationMapping(userId, location);

    const testFactory = new LocationTestFactory();
    const newLocation = testFactory.getLocationData(createPayload);

    this.locations = produce(this.locations, (draft) => {
      draft.push(newLocation);
    });

    return newLocation;
  };

  deleteLocation = async (locationId: number): Promise<boolean> => {
    const index = this.locations.findIndex(
      (location) => location.id === locationId
    );

    if (index === -1) return false;

    this.locations = produce(this.locations, (draft) => {
      draft.splice(index, 1);
    });
    return true;
  };
}

export { LocationTestDatabase };
