import { Review, Prisma } from '@prisma/client';

export interface IReviewDatabase {
  createReview: ({
    rating,
    title,
    text,
    userId,
    authorId
  }: IReviewCreateInput) => Promise<IReviewWithAuthor>;

  getReviewDetail: (reviewId: number) => Promise<Review>;

  checkReviewExists: (userId: string, authorId: string) => Promise<boolean>;

  getReviewsOfAuthor: (authorId: string) => Promise<IReviewWithAuthor[]>;
}

const reviewWithAuthor = Prisma.validator<Prisma.ReviewArgs>()({
  include: { author: true }
});

export type IReviewWithAuthor = Prisma.ReviewGetPayload<
  typeof reviewWithAuthor
>;

export interface IReviewCreateInput {
  rating: number;
  title: string;
  text: string;
  userId: string;
  authorId: string;
}
