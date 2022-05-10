import type { ReviewResponse } from '@prisma/client';
import { datatype, date, lorem } from 'faker';
import type { ICreateReviewResponseInput } from './types';

class ReviewResponseTestFactory {
  generateReviewText = () => lorem.paragraph(10);

  mapReviewReponseCreateInput = ({
    authorId,
    reviewId,
    text
  }: ICreateReviewResponseInput): ReviewResponse => {
    const creationData = date.past();
    const id = datatype.number(9999);

    return {
      id,
      text,
      isPublished: true,
      authorId,
      reviewId,
      createdAt: creationData,
      updatedAt: creationData
    };
  };
}

export { ReviewResponseTestFactory };
