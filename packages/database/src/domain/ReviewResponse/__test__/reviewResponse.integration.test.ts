import { ReviewResponse, User } from '@prisma/client';
import { datatype, lorem } from 'faker';
import { ReviewResponseDatabase } from '..';
import { ReviewDatabase, IReviewWithAuthor } from '../../Review';
import { UserDatabase, UserTestFactory } from '../../User';

describe('ReviewResponse Integration Test', () => {
  const testDbReview = new ReviewDatabase();
  const testDbReviewResponse = new ReviewResponseDatabase();

  let user: User;
  let author: User;

  let review: IReviewWithAuthor;
  let reviewRespponse: ReviewResponse;

  beforeAll(async () => {
    const userTestFactory = new UserTestFactory();

    const userCreateDataUser = userTestFactory.getUserCreateData();
    const userCreateDataAuthor = userTestFactory.getUserCreateData();

    const userDatabase = new UserDatabase();

    user = await userDatabase.createUser(userCreateDataUser);
    author = await userDatabase.createUser(userCreateDataAuthor);

    const text = lorem.text(2);
    const title = lorem.words(10);
    const rating = datatype.number(5);

    const reviewData = {
      rating,
      text,
      title,
      authorId: author.id,
      userId: user.id
    };
    review = await testDbReview.createReview(reviewData);
  });

  it('should create a new review response', async () => {
    const text = lorem.words(10);
    const reviewId = review.id;
    const authorId = user.id;

    reviewRespponse = await testDbReviewResponse.createReviewResponse({
      text,
      reviewId,
      authorId
    });

    const assert = {
      reviewId: reviewId,
      authorId: authorId,
      text
    };

    expect(!!reviewRespponse).toBe(true);
    expect(reviewRespponse).toEqual(expect.objectContaining(assert));
  });
  it('should return true for existing review response', async () => {
    const reviewId = review.id;
    const authorId = user.id;
    const exists = await testDbReviewResponse.checkReviewResponseExists(
      reviewId,
      authorId
    );

    expect(exists).toBe(true);
  });

  it('should return false for non existing review response', async () => {
    const reviewId = review.id;
    const authorId = datatype.uuid();
    const exists = await testDbReviewResponse.checkReviewResponseExists(
      reviewId,
      authorId
    );

    expect(exists).toBe(false);
  });
});
