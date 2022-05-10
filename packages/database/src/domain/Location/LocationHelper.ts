import type { Prisma } from '@prisma/client';
import type {
  ILocationContext,
  ILocationCustomContext,
  ILocationMapBox
} from './types';

class LocationHelper {
  /**
   * Transform the MapBox Context of a Location to separate fields
   *
   * @param context
   */
  static contextHandler = (
    location: ILocationMapBox
  ): ILocationCustomContext => {
    const updateContext: ILocationCustomContext = {
      regionId: null,
      regionText: null,
      regionWikidata: null,
      regionShortcode: null,
      countryId: null,
      countryText: null,
      countryWikidata: null,
      countryShortcode: null,
      postcodeId: null,
      postcodeText: null,
      placeId: null,
      placeWikidata: null,
      placeText: null
    };
    if (location.context == null) return updateContext;
    const { context } = location;

    context.map((item: ILocationContext) => {
      const type = item.id.split('.')[0];

      return Object.keys(item).map((key) => {
        const keyWithoutUnderScore = key.replace('_', '');
        const camelCaseKey =
          keyWithoutUnderScore.charAt(0).toUpperCase() +
          keyWithoutUnderScore.slice(1);

        const property = `${type}${camelCaseKey}`;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        updateContext[property] = item[key];
        return updateContext;
      });
    });
    return updateContext;
  };

  /**
   * Transform the Coordinates from Mapbox to ElasticSearch
   * String is Lat,Long -> Incoming is Array [Lon, Lat]
   * https://www.elastic.co/guide/en/elasticsearch/reference/current/geo-point.html
   */
  static transformCoordinates = (location: ILocationMapBox) => {
    const { geometry } = location;

    return `${geometry.coordinates[1]},${geometry.coordinates[0]}`;
  };

  /**
   * Location Mapper from Mapbox to Database
   */
  static getLocationMapping = (
    userId: string,
    location: ILocationMapBox
  ): Prisma.LocationCreateArgs => {
    const { id, place_type: placeType, place_name: placeName, text } = location;

    const contextData = LocationHelper.contextHandler(location);
    const coordinates = LocationHelper.transformCoordinates(location);

    const {
      regionId,
      regionText,
      regionWikidata,
      regionShortcode,
      countryId,
      countryText,
      countryWikidata,
      countryShortcode,
      postcodeId,
      postcodeText,
      placeId,
      placeWikidata,
      placeText
    } = contextData;

    return {
      data: {
        placeName,
        placeType: placeType[0],
        coordinates,
        mapboxId: id,
        userId,
        text,
        regionId,
        regionText,
        regionWikidata,
        regionShortcode,
        countryId,
        countryText,
        countryWikidata,
        countryShortcode,
        postcodeId,
        postcodeText,
        placeId,
        placeWikidata,
        placeText
      }
    };
  };
}

export { LocationHelper };
