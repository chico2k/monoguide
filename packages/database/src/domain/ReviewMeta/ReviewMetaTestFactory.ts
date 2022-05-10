import type { ReviewMeta } from '@prisma/client';
import { datatype, date } from 'faker';

/**
 * Review Meta Factory to create test data
 */
class ReviewMetaTestFactory {
  reviewMetas: ReviewMeta[] = [];

  constructor() {
    this.reviewMetas = this.reviewMetaTestDataCreation();
  }

  /**
   * Get the current review metas
   *
   * @returns a list of database reviews
   */
  getReviewMetaTestdata = () => this.reviewMetas;

  /**
   *  Creates a new database review meta for a speific user
   *
   * @param userId
   * @returns a database review meta
   */
  createReviewMetaForUser = (userId: string) => ({
    id: datatype.number(999),
    averageRating: this.generateAverageRating(),
    numberRating: this.generateNumberRating(),
    createdAt: date.past(),
    updatedAt: new Date(),
    userId
  });

  /**
   * Create more Review Metas
   */
  createMoreReviewMeta = () => {
    const moreReviewMeta = this.reviewMetaTestDataCreation();
    this.reviewMetas = [...this.reviewMetas, ...moreReviewMeta];
  };

  private generateAverageRating = () => datatype.float({ min: 1, max: 5 });

  private generateNumberRating = () => datatype.number({ min: 2, max: 500 });

  private reviewMetaTestDataCreation = (): ReviewMeta[] => {
    const reviewMetas: ReviewMeta[] = [];

    const maxReviewMetas = 3;

    for (let i = 0; i < maxReviewMetas; i += 1) {
      const userId = datatype.uuid();
      const reviewMeta: ReviewMeta = this.createReviewMetaForUser(userId);

      reviewMetas.push(reviewMeta);
    }

    return reviewMetas;
  };
}

export { ReviewMetaTestFactory };
