import { datatype } from 'faker';
import { ReviewTestFactory, IReviewWithAuthor, ReviewTestDatabase } from '..';

describe('Review Unit Test', () => {
  const testDb = new ReviewTestDatabase();
  let review: IReviewWithAuthor;

  const reviewTestFactory = new ReviewTestFactory();

  const authorId = datatype.uuid();
  const userId = datatype.uuid();

  const reviewInput = reviewTestFactory.createReviewInputData(userId, authorId);

  const reviewInput2 = reviewTestFactory.createReviewInputData(
    userId,
    authorId
  );

  const assert = reviewTestFactory.transformInputToAssert(reviewInput);
  const assert2 = reviewTestFactory.transformInputToAssert(reviewInput);

  it('should create a new review', async () => {
    review = await testDb.createReview(reviewInput);

    expect(!!review).toBe(true);
    expect(review).toEqual(expect.objectContaining(assert));
  });

  it('should return a review detail', async () => {
    const detail = await testDb.getReviewDetail(review.id);

    expect(detail).toEqual(expect.objectContaining(assert));
  });

  it('should return true for existing reviews for authohr and user id', async () => {
    const exist = await testDb.checkReviewExists(userId, authorId);
    expect(exist).toBe(true);

    const anotherUserId = datatype.uuid();
    const exist2 = await testDb.checkReviewExists(anotherUserId, authorId);
    expect(exist2).toBe(false);
  });

  it('should get the reviews of a specific author id', async () => {
    await testDb.createReview(reviewInput2);

    const reviews = await testDb.getReviewsOfAuthor(authorId);

    expect(reviews).toEqual(
      expect.arrayContaining([
        expect.objectContaining(assert),
        expect.objectContaining(assert2)
      ])
    );
  });
});
