import { name, date, datatype, lorem, image } from 'faker';
import type { IUserElasticDocument } from '../../..';
/**
 * Elastic User Seed Mock Data
 */

export const elasticUserSeed: IUserElasticDocument[] = [
  {
    id: 'user_1',
    firstName: name.firstName(),
    lastName: name.lastName(),
    username: 'user_1',
    isGuide: false,
    isBlacklisted: false,
    createdAt: date.past(),

    sport: [
      {
        id: datatype.number(99999),
        level: datatype.number(3),
        createdAt: date.past(),
        sportRef: {
          title: 'Yoga',
          id: 1
        }
      },
      {
        id: datatype.number(99999),
        level: datatype.number(3),
        createdAt: date.past(),
        sportRef: {
          title: 'Surfing',
          id: 2
        }
      }
    ],
    location: {
      id: datatype.number(99999),
      mapboxId: 'address.6260737639207990',
      placeName: 'Traunreuter Straße, 83349 Palling, Germany',
      placeType: 'address',
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
      text: 'Traunreuter Straße',
      coordinates: '47.9982301,12.6355723'
    },

    vita: [
      {
        id: datatype.number(99999),
        fromDate: date.past(),
        toDate: null,
        isPublished: true,
        title: lorem.sentence(7),
        text: lorem.words(20),
        isCurrent: true
      },
      {
        id: datatype.number(99999),
        fromDate: date.past(),
        toDate: date.past(),
        isPublished: true,
        title: lorem.sentence(7),
        text: lorem.words(20),
        isCurrent: false
      },
      {
        id: datatype.number(99999),
        fromDate: date.past(),
        toDate: date.past(),
        isPublished: true,
        title: lorem.sentence(7),
        text: lorem.words(20),
        isCurrent: false
      }
    ],
    tag: [
      {
        id: datatype.number(99999),
        tagRef: {
          id: datatype.number(99999),
          text: lorem.word()
        }
      },
      {
        id: datatype.number(99999),
        tagRef: {
          id: datatype.number(99999),
          text: lorem.word()
        }
      },
      {
        id: datatype.number(99999),
        tagRef: {
          id: datatype.number(99999),
          text: lorem.word()
        }
      }
    ],

    avatar: {
      blurBase64:
        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4gIcSUNDX1BST0ZJT',
      url: image.imageUrl()
    },
    reviewMeta: {
      averageRating: 4.5,
      numberRating: 4
    }
  }
];
