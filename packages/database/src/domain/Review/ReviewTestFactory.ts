import type { User } from '@prisma/client';
import { AuthTestFactory } from '@sportsguide/auth';
import { datatype, lorem, date } from 'faker';
import type { IReviewWithAuthor } from '.';
import { UserTestFactory } from '../User';
import type { IReviewCreateInput } from './types';

class ReviewTestFactory {
  reviews: IReviewWithAuthor[] = [];

  authors: User[] = [];

  constructor() {
    this.reviews = this.reviewTestDataCreation();
  }

  private checkIfAuthorExist = (authorId: string): User | undefined =>
    this.authors.find((author) => author.id === authorId);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private createNewAuthor = (_authorId: string) => {
    const userTestFactory = new UserTestFactory();

    const clerkUser = AuthTestFactory.generateClerkUser();

    const author = userTestFactory.mapUserCreateInput(clerkUser);

    this.authors.push(author);

    return author;
  };

  private generateReviewText = () => lorem.paragraph(10);

  private geenrateReviewTtitle = () => lorem.words(5);

  private generateRating = () => datatype.number({ min: 1, max: 5 });

  /**
   * Create Review Input Data
   *
   * @param userId
   * @param authorId
   * @returns an object of IReviewCreateInput
   */
  createReviewInputData = (
    userId: string,
    authorId: string
  ): IReviewCreateInput => ({
    rating: this.generateRating(),
    authorId,
    userId,
    text: this.generateReviewText(),
    title: this.geenrateReviewTtitle()
  });

  /**
   * Transforms an input to an object with can be used for assertion in the test
   *
   * @param reviewCreateInput
   * @returns Object with rating, author_id, user_id, text and title
   */
  transformInputToAssert = (reviewCreateInput: IReviewCreateInput) => ({
    rating: reviewCreateInput.rating,
    authorId: reviewCreateInput.authorId,
    userId: reviewCreateInput.userId,
    text: reviewCreateInput.text,
    title: reviewCreateInput.title
  });

  createReviewWithAuthor = ({
    rating,
    title,
    text,
    userId,
    authorId
  }: IReviewCreateInput): IReviewWithAuthor => {
    let author = this.checkIfAuthorExist(authorId);
    if (!author) author = this.createNewAuthor(authorId);

    const creationDate = date.past();
    const review = {
      id: datatype.number(999),
      rating,
      title,
      text,
      isPublished: true,
      userId,
      authorId,
      createdAt: creationDate,
      updatedAt: creationDate,
      author
    };

    this.reviews.push(review);
    return review;
  };

  getReviewTestDate = () => this.reviews;

  private reviewTestDataCreation = (): IReviewWithAuthor[] => {
    const reviews: IReviewWithAuthor[] = [];

    const maxReviews = 3;
    const userId = datatype.uuid();

    for (let i = 0; i < maxReviews; i += 1) {
      const authorId = datatype.uuid();
      const createReviewInputData = this.createReviewInputData(
        userId,
        authorId
      );

      const review = this.createReviewWithAuthor(createReviewInputData);

      reviews.push(review);
    }

    return reviews;
  };
}

export { ReviewTestFactory };
