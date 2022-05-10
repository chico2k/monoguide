import type { IUserIndex } from '../types/user';

export const UserIndexDefinition: IUserIndex = {
  name: 'user',
  body: {
    index_patterns: ['user-*'],
    template: {
      mappings: {
        dynamic: 'strict',
        properties: {
          isGuide: {
            type: 'boolean'
          },

          createdAt: {
            type: 'date'
          },

          isBlacklisted: {
            type: 'boolean'
          },

          firstName: {
            type: 'keyword'
          },
          lastName: {
            type: 'keyword'
          },
          username: {
            type: 'keyword'
          },
          id: {
            type: 'keyword'
          },
          sport: {
            dynamic: 'strict',
            type: 'object',
            properties: {
              level: {
                type: 'integer'
              },

              createdAt: {
                type: 'date'
              },
              id: {
                type: 'integer'
              },
              sportRef: {
                dynamic: 'strict',
                type: 'object',
                properties: {
                  id: {
                    type: 'integer'
                  },
                  title: {
                    type: 'keyword'
                  }
                }
              }
            }
          },
          vita: {
            dynamic: 'strict',
            type: 'object',
            properties: {
              fromDate: {
                type: 'date'
              },
              toDate: {
                type: 'date'
              },

              isPublished: {
                type: 'boolean'
              },

              id: {
                type: 'integer'
              },
              text: {
                type: 'keyword'
              },
              title: {
                type: 'keyword'
              },
              isCurrent: {
                type: 'boolean'
              }
            }
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
              regionText: {
                type: 'text'
              },
              regionId: {
                type: 'text'
              },
              regionShortcode: {
                type: 'text'
              },
              regionWikidata: {
                type: 'text'
              },
              countryText: {
                type: 'text'
              },
              countryId: {
                type: 'text'
              },
              countryWikidata: {
                type: 'text'
              },
              countryShortcode: {
                type: 'text'
              },
              postcodeId: {
                type: 'text'
              },
              postcodeText: {
                type: 'text'
              },
              placeId: {
                type: 'text'
              },
              placeWikidata: {
                type: 'text'
              },

              coordinates: {
                type: 'geo_point'
              },

              id: {
                type: 'integer'
              },

              text: {
                type: 'text'
              },

              mapboxId: {
                type: 'text'
              }
            }
          },

          tag: {
            dynamic: 'strict',
            type: 'object',
            properties: {
              id: {
                type: 'integer'
              },
              tagRef: {
                dynamic: 'strict',
                type: 'object',
                properties: {
                  id: {
                    type: 'integer'
                  },
                  text: {
                    type: 'keyword'
                  }
                }
              }
            }
          },
          avatar: {
            dynamic: 'strict',
            type: 'object',
            properties: {
              url: {
                type: 'text'
              },
              blurBase64: {
                type: 'text'
              }
            }
          },
          reviewMeta: {
            dynamic: 'strict',
            type: 'object',
            properties: {
              averageRating: {
                type: 'float'
              },
              numberRating: {
                type: 'float'
              }
            }
          }
        }
      }
    }
  }
};

export default UserIndexDefinition;
