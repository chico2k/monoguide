import { ReviewMetaTestFactory } from '../ReviewMetaTestFactory';

describe('RevieMeta Test Factory Unit Test', () => {
  const reviewMetaTestFactory = new ReviewMetaTestFactory();

  it('should create test data', async () => {
    const data = reviewMetaTestFactory.getReviewMetaTestdata();

    expect(data.length).toBeGreaterThan(0);
  });
});
