import type { Location, Prisma } from '@prisma/client';
import { datatype } from 'faker';
import { LocationHelper } from './LocationHelper';
import type { ILocationMapBox } from './types';
import jsonFile from './__test__/mapbox.json';

/**
 * A class to get location example data and test helper functions
 */
class LocationTestFactory {
  /**
   * A function to get a list of mapbox examples from the JSON
   *
   * @returns a list of mapbox examples from the JSON
   */
  getExampleLocationMapboxList = (): ILocationMapBox[] =>
    jsonFile as ILocationMapBox[];

  /**
   * A function to get a single ILocationMapBox example
   *
   * @returns a single example for the ILocationMapBox
   */
  getExampleLocationMapbox = (): ILocationMapBox => {
    const list = this.getExampleLocationMapboxList();

    const ramdomIndex = datatype.number(list.length - 1);

    return list[ramdomIndex];
  };

  /**
   * Generates Test Data based on the Database Schema
   *
   * @returns a list of Database Locations
   */
  gestLocationTestData = () => {
    const testData: Location[] = [];

    const mapBoxLocationList = this.getExampleLocationMapboxList();

    mapBoxLocationList.map((mapBoxLocation) => {
      const userId = datatype.uuid();
      const payload = LocationHelper.getLocationMapping(userId, mapBoxLocation);

      const location = this.getLocationData(payload);
      return testData.push(location);
    });
    return testData;
  };

  /**
   * Maps a an Create Location Input to a Database Location
   *
   * @param input Prisma.LocationCreateArgs
   * @returns
   */
  getLocationData = (
    locationCreateArgs: Prisma.LocationCreateArgs
  ): Location => {
    const { data } = locationCreateArgs;

    const creationDate = new Date();

    return {
      ...(data as Location),
      id: datatype.number(999),
      createdAt: creationDate,
      updatedAt: creationDate
    };
  };
}
export { LocationTestFactory };
