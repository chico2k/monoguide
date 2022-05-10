import type {
  ICalculateRatingValuesInput,
  ICalculateRatingValuesOutput
} from './types';

class ReviewMetaHelper {
  /**
   * Method to calculate the new rating values (Number & Average)
   *
   * */
  static calculateRatingValues = ({
    newRating,
    currentNumberRating,
    currentAverageRating
  }: ICalculateRatingValuesInput): ICalculateRatingValuesOutput => {
    const newNumberRating = currentNumberRating + 1;

    const newAverageRating =
      (currentAverageRating * currentNumberRating + newRating) /
      newNumberRating;

    const roundedAverage =
      Math.round((newAverageRating + Number.EPSILON) * 100) / 100;

    return {
      numberRating: newNumberRating,
      averageRating: roundedAverage
    };
  };
}

export { ReviewMetaHelper };
