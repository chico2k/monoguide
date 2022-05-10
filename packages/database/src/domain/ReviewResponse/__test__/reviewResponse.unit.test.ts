import { datatype, lorem } from 'faker';
import { ReviewResponseTestDatabase } from '..';

describe('ReviewResponse Unit Test', () => {
  const testDB = new ReviewResponseTestDatabase();

  const reviewId = datatype.number(9999);
  const authorId = datatype.uuid();
  const text = lorem.words(10);

  it('should create a new review response', async () => {
    const reviewResponeData = { reviewId, authorId, text };
    const newReviewResponse = await testDB.createReviewResponse(
      reviewResponeData
    );

    const assert = {
      reviewId,
      authorId,
      text
    };

    expect(!!newReviewResponse).toBe(true);
    expect(newReviewResponse).toEqual(expect.objectContaining(assert));
  });

  it('should return true for existing review response', async () => {
    const exists = await testDB.checkReviewResponseExists(reviewId, authorId);

    expect(exists).toBe(true);
  });

  it('should return false for non existing review response', async () => {
    const authorId = datatype.uuid();
    const exists = await testDB.checkReviewResponseExists(reviewId, authorId);

    expect(exists).toBe(false);
  });
});
