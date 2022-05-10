import type { IReviewIndex } from '../types/review';

export const ReviewIndexDefinition: IReviewIndex = {
  name: 'review',
  body: {
    index_patterns: ['review-*'],
    template: {
      mappings: {
        dynamic: 'strict',
        properties: {
          userId: {
            type: 'text'
          },
          id: {
            type: 'integer'
          },
          text: {
            type: 'text'
          },
          isPublished: {
            type: 'boolean'
          },
          title: {
            type: 'text'
          },
          createdAt: {
            type: 'date'
          },
          rating: {
            type: 'integer'
          },
          author: {
            dynamic: 'strict',
            type: 'object',
            properties: {
              firstName: {
                type: 'keyword'
              },
              lastName: {
                type: 'keyword'
              },

              id: {
                type: 'keyword'
              }
            }
          },
          reviewResponse: {
            dynamic: 'strict',
            type: 'object',
            properties: {
              id: {
                type: 'integer'
              },
              text: {
                type: 'text'
              },
              isPublished: {
                type: 'boolean'
              },
              createdAt: {
                type: 'date'
              }
            }
          }
        }
      }
    }
  }
};

export default ReviewIndexDefinition;
