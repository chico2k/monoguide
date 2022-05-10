import { datatype } from 'faker';
import { ReviewMetaTestDatabase } from '..';

describe('ReviewMeta Unit Test', () => {
  const testDB = new ReviewMetaTestDatabase();
  const userId = datatype.uuid();

  it('should handle the initial review meta', async () => {
    const newRating = 4;

    const reviewMeta = await testDB.updateAverageReviewRating(
      userId,
      newRating
    );

    expect(reviewMeta).toStrictEqual(
      expect.objectContaining({
        userId,
        averageRating: newRating,
        numberRating: 1
      })
    );
  });

  it('should handle the review #2', async () => {
    const newRating = 3;
    const expectRatings = 3.5;

    const reviewMeta = await testDB.updateAverageReviewRating(
      userId,
      newRating
    );
    expect(reviewMeta).toStrictEqual(
      expect.objectContaining({
        userId,
        averageRating: expectRatings,
        numberRating: 2
      })
    );
  });
});
