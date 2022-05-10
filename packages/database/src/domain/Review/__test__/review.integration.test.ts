import { User } from '@prisma/client';
import { datatype, lorem } from 'faker';
import { AuthTestFactory } from '@sportsguide/auth';
import { ReviewDatabase } from '..';
import type { IReviewWithAuthor } from '..';
import { UserDatabase, UserTestFactory } from '../../User';

describe('Review Integration Test', () => {
  const testDb = new ReviewDatabase();

  let review: IReviewWithAuthor;
  let user: User;
  let author: User;

  const userTestFactory = new UserTestFactory();
  const userDatabase = new UserDatabase();

  beforeAll(async () => {
    const userCreateDataUser = AuthTestFactory.generateClerkUser();
    const userCreateDataAuthor = AuthTestFactory.generateClerkUser();

    user = await userDatabase.createUser(userCreateDataUser);
    author = await userDatabase.createUser(userCreateDataAuthor);
  });

  it('should create a new review', async () => {
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
    review = await testDb.createReview(reviewData);

    expect(!!review).toBe(true);

    expect(review.author).toEqual(expect.objectContaining(author));
    expect(review).toEqual(
      expect.objectContaining({
        text,
        title,
        userId: user.id,
        rating
      })
    );
  });

  it('should get the review detail', async () => {
    const detail = await testDb.getReviewDetail(review.id);

    expect(detail).toStrictEqual(review);
  });

  it('should return true for existing reviews', async () => {
    const exists = await testDb.checkReviewExists(user.id, author.id);

    expect(exists).toBe(true);
  });

  it('should return false for non-existng reviews', async () => {
    const userCreateDataAnotherUser = userTestFactory.getUserCreateData();
    const anotherUser = await userDatabase.createUser(
      userCreateDataAnotherUser
    );
    const exists = await testDb.checkReviewExists(anotherUser.id, author.id);

    expect(exists).toBe(false);
  });
});
