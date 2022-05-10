import { name, date, datatype, lorem } from 'faker';
import type { IReviewElasticDocument } from '../../..';

export const elasticReviewSeed: IReviewElasticDocument[] = [
  {
    id: 1,
    userId: 'user_1',
    text: lorem.sentence(40),
    title: lorem.sentence(7),
    createdAt: date.past(),
    rating: datatype.number(5),
    isPublished: true,
    author: {
      id: 'user_2',
      firstName: name.firstName(),
      lastName: name.lastName()
    },
    reviewResponse: {
      id: datatype.number(99999),
      text: lorem.sentence(40),
      createdAt: date.past(),
      isPublished: true
    }
  },
  {
    id: 2,
    userId: 'user_1',
    text: lorem.sentence(40),
    isPublished: true,
    title: lorem.sentence(7),
    createdAt: date.past(),
    rating: datatype.number(5),

    author: {
      id: 'user_3',
      firstName: name.firstName(),
      lastName: name.lastName()
    },
    reviewResponse: {
      id: datatype.number(99999),
      text: lorem.sentence(40),
      createdAt: date.past(),
      isPublished: true
    }
  },
  {
    id: 3,
    userId: 'user_1',
    text: lorem.sentence(40),
    isPublished: true,
    title: lorem.sentence(7),
    createdAt: date.past(),
    rating: datatype.number(5),

    author: {
      id: 'user_4',
      firstName: name.firstName(),
      lastName: name.lastName()
    },
    reviewResponse: {
      id: datatype.number(99999),
      text: lorem.sentence(40),
      createdAt: date.past(),
      isPublished: true
    }
  }
];
