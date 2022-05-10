import type { IImageIndex } from '../types/image';

export const ImageIndexDefinition: IImageIndex = {
  name: 'image',
  body: {
    index_patterns: ['image-*'],
    template: {
      mappings: {
        dynamic: 'strict',
        properties: {
          user_id: {
            type: 'keyword'
          },
          orderNumber: {
            type: 'integer'
          },
          caption: {
            type: 'text'
          },
          id: {
            type: 'integer'
          },
          isProfileImage: {
            type: 'boolean'
          },
          origin: {
            type: 'keyword'
          },
          fileName: {
            type: 'keyword'
          },
          createdAt: {
            type: 'date'
          },

          blurBase64: {
            type: 'keyword'
          },
          url: {
            type: 'keyword'
          },
          location: {
            dynamic: 'strict',
            type: 'object',
            properties: {
              placeName: {
                type: 'text'
              },
              placeType: {
                type: 'text'
              },
              mapboxId: {
                type: 'text'
              },
              text: {
                type: 'text'
              },

              regionText: {
                type: 'text'
              },
              regionId: {
                type: 'text'
              },
              regionWikidata: {
                type: 'text'
              },
              regionShortcode: {
                type: 'text'
              },

              coordinates: {
                type: 'geo_point'
              },
              id: {
                type: 'integer'
              },
              countryId: {
                type: 'text'
              },
              countryText: {
                type: 'text'
              },
              countryWikidata: {
                type: 'text'
              },
              countryShortcode: {
                type: 'text'
              },

              postcodeText: {
                type: 'text'
              },
              postcodeId: {
                type: 'text'
              },
              placeId: {
                type: 'text'
              },
              placeWikidata: {
                type: 'text'
              },
              placeText: {
                type: 'text'
              }
            }
          }
        }
      }
    }
  }
};

export default ImageIndexDefinition;
