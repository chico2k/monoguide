import es from './client';

export { es };

/**
 * User Export
 */
export type {
  IUserElastic,
  IUserElasticDocument,
  IUserElasticSearchResponse
} from './types/user';
export { UserElastic } from './Index/User';
export { UserElasticMock } from './Index/User/__mock__';

/**
 * Review
 */
export type {
  IReviewElastic,
  IReviewElasticDocument,
  IReviewElasticSearchResponse,
  IReviewListOutput,
  IReviewDetailOutput
} from './types/review';

export { ReviewElastic } from './Index/Review/review';
export { ReviewElasticMock } from './Index/Review/__mock__';

/**
 * Image
 */

export { ImageElastic } from './Index/Image';
export type {
  IImageElastic,
  IImageElasticSearchResponse,
  IImageElasticDocument,
  IImageDetailOutput
} from './types/image';
