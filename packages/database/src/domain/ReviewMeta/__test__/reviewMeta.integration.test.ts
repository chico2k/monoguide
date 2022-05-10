import { User } from '@prisma/client';
import { ReviewMetaDatabase } from '..';
import { UserTestFactory, UserDatabase } from '../../User';

describe('ReviewMeta Integration Test', () => {
  const testDB = new ReviewMetaDatabase();

  let user: User;

  beforeAll(async () => {
    const userTestFactory = new UserTestFactory();

    const userCreateData = userTestFactory.getUserCreateData();
    const userDatabase = new UserDatabase();
    user = await userDatabase.createUser(userCreateData);
  });

  it('should handle the initial review meta', async () => {
    const newRating = 4;

    const reviewMeta = await testDB.updateAverageReviewRating(
      user.id,
      newRating
    );

    expect(reviewMeta).toStrictEqual(
      expect.objectContaining({
        userId: user.id,
        averageRating: newRating,
        numberRating: 1
      })
    );
  });

  it('should handle the review #2', async () => {
    const newRating = 3;
    const expectRatings = 3.5;

    const reviewMeta = await testDB.updateAverageReviewRating(
      user.id,
      newRating
    );
    expect(reviewMeta).toStrictEqual(
      expect.objectContaining({
        userId: user.id,
        averageRating: expectRatings,
        numberRating: 2
      })
    );
  });
});
