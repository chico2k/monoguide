import { ReviewMetaTestFactory, UserTestFactory } from '@sportsguide/database';
import { UserElastic } from '..';
import { TestingHelper } from '../../../lib/test';

describe('User Review Meta Integration Test', () => {
  const userElastic = new UserElastic();

  const userFactory = new UserTestFactory();
  const reviewMetaFactory = new ReviewMetaTestFactory();

  const userList = userFactory.getUserTestData();

  const reviewMetaList = reviewMetaFactory.getReviewMetaTestdata();
  const reviewMeta = reviewMetaList[0];

  const updatedReviewMeta = reviewMetaList[1];

  const user = userList[0];
  const userId = user.id;

  beforeAll(async () => {
    await userElastic.createUser(user);
  });

  it('should update the Review Meta', async () => {
    /**
     * Update Review Meta
     */
    const response = await userElastic.updateReviewMeta(userId, reviewMeta);

    /**
     * Get User Detail
     */
    await TestingHelper.wait();
    const userDetailResponse = await userElastic.getUserDetail(user.username);
    const transformedUser =
      TestingHelper.transformDetailResponseToUser(userDetailResponse);

    /**
     * Assertions
     */
    expect(response).toBe(true);
    expect(reviewMeta).toEqual(
      expect.objectContaining(transformedUser.reviewMeta)
    );
  });

  it('should update the Review Meta for the same user', async () => {
    /**
     * Update Review Meta
     */
    const response = await userElastic.updateReviewMeta(
      userId,
      updatedReviewMeta
    );

    /**
     * Get User Detail
     */
    await TestingHelper.wait();
    const userDetailResponse = await userElastic.getUserDetail(user.username);
    const transformedUser =
      TestingHelper.transformDetailResponseToUser(userDetailResponse);

    expect(response).toBe(true);
    expect(updatedReviewMeta).toEqual(
      expect.objectContaining(transformedUser.reviewMeta)
    );
  });
});
