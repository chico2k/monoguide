import { ReviewMetaHelper } from '../ReviewMetaHelper';

describe('ReviewMetaHelper Unit Test Helper', () => {
  it('should calculate the inital meta review', async () => {
    const newRating = 5;

    const currentNumberRating = 0;
    const currentAverageRating = 0;

    const result = ReviewMetaHelper.calculateRatingValues({
      newRating,
      currentNumberRating,
      currentAverageRating
    });

    const assert = {
      numberRating: 1,
      averageRating: 5
    };

    expect(result).toStrictEqual(assert);
  });
  it('should calculate the meta review #1', async () => {
    const newRating = 4;

    const currentNumberRating = 1;
    const currentAverageRating = 5;

    const result = ReviewMetaHelper.calculateRatingValues({
      newRating,
      currentNumberRating,
      currentAverageRating
    });

    const assert = {
      numberRating: 2,
      averageRating: 4.5
    };

    expect(result).toStrictEqual(assert);
  });

  it('should calculate the meta review #2', async () => {
    const newRating = 3.5;

    const currentNumberRating = 2;
    const currentAverageRating = 4.5;

    const result = ReviewMetaHelper.calculateRatingValues({
      newRating,
      currentNumberRating,
      currentAverageRating
    });

    const assert = {
      numberRating: 3,
      averageRating: 4.17
    };

    expect(result).toStrictEqual(assert);
  });
});
