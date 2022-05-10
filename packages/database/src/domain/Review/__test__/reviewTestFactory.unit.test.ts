import { ReviewTestFactory } from '..';

describe('Review Test Factory Unit Test', () => {
  const reviewTestFactory = new ReviewTestFactory();

  it('should create test data', async () => {
    const list = reviewTestFactory.getReviewTestDate();
    expect(list.length).toBeGreaterThan(0);
  });
});
