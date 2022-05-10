import type { IReviewIndex } from './review';
import type { IImageIndex } from './image';
import type { IUserIndex } from './user';

/**
 * Generic
 */

export type ObjectField<T> = {
  dynamic: string;
  type: string;
  properties: T;
};

export interface IIndexBody<T> {
  index_patterns: string[];
  template: {
    mappings: T;
  };
}
export type IndexDefinition = IImageIndex | IUserIndex | IReviewIndex;
