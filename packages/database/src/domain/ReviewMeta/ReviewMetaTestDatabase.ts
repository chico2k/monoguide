import type { ReviewMeta } from '@prisma/client';
import { produce } from 'immer';
import { datatype, date } from 'faker';
import { ReviewMetaHelper } from './ReviewMetaHelper';
import type { IUpdateRatingValuesInput, IReviewMetaDatabase } from './types';

class ReviewMetaTestDatabase implements IReviewMetaDatabase {
  reviewMetas: ReviewMeta[] = [];

  private getCurrentRatingValues = async (
    userId: string
  ): Promise<ReviewMeta> => {
    const index = this.reviewMetas.findIndex(
      (reviewMeta) => reviewMeta.userId === userId
    );

    if (index === -1) {
      const inital = this.createInitial(userId);
      this.reviewMetas.push(inital);
      return inital;
    }

    return this.reviewMetas[index];
  };

  private createInitial = (userId: string) => {
    const creationDate = date.past();
    return {
      id: datatype.number(9999),
      averageRating: 0,
      numberRating: 0,
      userId,
      updatedAt: creationDate,
      createdAt: creationDate
    };
  };

  private updateRatingValues = async ({
    userId,
    averageRating,
    numberRating
  }: IUpdateRatingValuesInput): Promise<ReviewMeta> => {
    const index = this.reviewMetas.findIndex(
      (reviewMeta) => reviewMeta.userId === userId
    );

    this.reviewMetas = produce(this.reviewMetas, (draft) => {
      draft[index].numberRating = numberRating;
      draft[index].averageRating = averageRating;
    });

    return this.reviewMetas[index];
  };

  updateAverageReviewRating = async (
    userId: string,
    newRating: number
  ): Promise<ReviewMeta> => {
    const {
      averageRating: currentAverageRating,
      numberRating: currentNumberRating
    } = await this.getCurrentRatingValues(userId);

    const calculatedReviewMeta = ReviewMetaHelper.calculateRatingValues({
      newRating,
      currentNumberRating,
      currentAverageRating
    });

    return this.updateRatingValues({
      userId,
      ...calculatedReviewMeta
    });
  };
}

export { ReviewMetaTestDatabase };
