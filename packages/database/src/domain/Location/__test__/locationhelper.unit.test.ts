import { datatype } from 'faker';
import { LocationHelper } from '..';

describe('Location Unit Test Helpers', () => {
  const mapBoxResponse = {
    id: 'address.6260737639207990',
    type: 'Feature',
    place_type: ['address'],
    relevance: 1,
    properties: {
      accuracy: 'street'
    },
    text: 'Traunreuter Straße',
    place_name: 'Traunreuter Straße, 83349 Palling, Germany',
    center: [12.6355723, 47.9982301],
    geometry: {
      type: 'Point',
      coordinates: [12.6355723, 47.9982301]
    },
    context: [
      {
        id: 'postcode.10127545138159290',
        text: '83349'
      },
      {
        id: 'place.10127545138808750',
        wikidata: 'Q262325',
        text: 'Palling'
      },
      {
        id: 'region.7718916604336910',
        wikidata: 'Q980',
        short_code: 'DE-BY',
        text: 'Bavaria'
      },
      {
        id: 'country.11437281100480410',
        wikidata: 'Q183',
        short_code: 'de',
        text: 'Germany'
      }
    ]
  };

  it('should transform the location context from mapbox', () => {
    const transformedContext = LocationHelper.contextHandler(mapBoxResponse);

    const assert = {
      postcodeId: 'postcode.10127545138159290',
      postcodeText: '83349',
      placeId: 'place.10127545138808750',
      placeWikidata: 'Q262325',
      placeText: 'Palling',
      regionId: 'region.7718916604336910',
      regionWikidata: 'Q980',
      regionShortcode: 'DE-BY',
      regionText: 'Bavaria',
      countryId: 'country.11437281100480410',
      countryWikidata: 'Q183',
      countryShortcode: 'de',
      countryText: 'Germany'
    };

    expect(transformedContext).toStrictEqual(assert);
  });

  it('should transform the mapbox coordiantes to elasticsearch coordinates', () => {
    const transformedCoordinates =
      LocationHelper.transformCoordinates(mapBoxResponse);
    const assert = '47.9982301,12.6355723';

    expect(assert).toBe(transformedCoordinates);
  });

  it('should do the location mapping', () => {
    const userId = datatype.uuid();

    const mapping = LocationHelper.getLocationMapping(userId, mapBoxResponse);

    const assert = {
      data: {
        placeName: 'Traunreuter Straße, 83349 Palling, Germany',
        placeType: 'address',
        coordinates: '47.9982301,12.6355723',
        mapboxId: 'address.6260737639207990',
        userId,
        text: 'Traunreuter Straße',
        regionId: 'region.7718916604336910',
        regionText: 'Bavaria',
        regionWikidata: 'Q980',
        regionShortcode: 'DE-BY',
        countryId: 'country.11437281100480410',
        countryText: 'Germany',
        countryWikidata: 'Q183',
        countryShortcode: 'de',
        postcodeId: 'postcode.10127545138159290',
        postcodeText: '83349',
        placeId: 'place.10127545138808750',
        placeWikidata: 'Q262325',
        placeText: 'Palling'
      }
    };

    expect(assert).toStrictEqual(mapping);
  });
});
