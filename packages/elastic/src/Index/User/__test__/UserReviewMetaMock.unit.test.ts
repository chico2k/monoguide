import { ReviewMetaTestFactory, UserTestFactory } from '@sportsguide/database';
import { UserElasticMock } from '../__mock__';

describe('User Review Meta Unit Test', () => {
  const elasticMock = new UserElasticMock();
  const userFactory = new UserTestFactory();
  const reviewMetaFactory = new ReviewMetaTestFactory();

  const reviewMetaList = reviewMetaFactory.getReviewMetaTestdata();
  const reviewMeta = reviewMetaList[0];

  const updatedReviewMeta = reviewMetaList[1];

  const [user] = userFactory.getUserTestData();
  const { id: userId } = user;

  beforeAll(async () => {
    const test = await elasticMock.createUser(user);
  });

  it('should update the Review Meta', async () => {
    const response = await elasticMock.updateReviewMeta(userId, reviewMeta);

    const detail = elasticMock.getUserDetailelper(userId);

    expect(response).toBe(true);
    expect(reviewMeta).toEqual(expect.objectContaining(detail.reviewMeta));
  });

  it('should update the Review Meta for the same user', async () => {
    const response = await elasticMock.updateReviewMeta(
      userId,
      updatedReviewMeta
    );

    const detail = elasticMock.getUserDetailelper(userId);

    expect(response).toBe(true);
    expect(updatedReviewMeta).toEqual(
      expect.objectContaining(detail.reviewMeta)
    );
  });
});
