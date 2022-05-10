import type {
  IImageWithLocation,
  IReviewWithAuthor,
  ISportWithSportRef,
  ITagWithTagRef,
} from '@sportsguide/database';
import type {
  Location,
  ReviewMeta,
  ReviewResponse,
  Vita,
} from '@prisma/client';
import type { User } from '@prisma/client';
import type { Request } from 'express';

declare module 'http' {
  interface IncomingHttpHeaders {
    'webhook-id': string;
    'webhook-timestamp': string;
    'webhook-signature': string;
  }
}

export type IEventTypesDatabase = {
  // User
  'user.database.created': 'user.database.created';
  'user.database.updated': 'user.database.updated';
  'user.database.deleted': 'user.database.deleted';
  // Sport
  'user.sport.created': 'user.sport.created';
  'user.sport.updated': 'user.sport.updated';
  'user.sport.deleted': 'user.sport.deleted';
  // Location
  'user.location.updated': 'user.location.updated';
  //Tag
  'user.tag.created': 'user.tag.created';
  'user.tag.deleted': 'user.tag.deleted';
  // Vita
  'user.vita.created': 'user.vita.created';
  'user.vita.updated': 'user.vita.updated';
  'user.vita.deleted': 'user.vita.deleted';
  // ReviewMeta
  'user.reviewMeta.updated': 'user.reviewMeta.updated';
  // Image
  'image.created': 'image.created';
  // Review
  'review.created': 'review.created';
  'review.response.created': 'review.response.created';
};

export type IWebhookDatabase = {
  eventTypes: IEventTypesDatabase;

  verify: (request: Request) => SvixPayloadDatabase;

  createdUser: (user: User) => Promise<boolean>;
  upatedUser: (user: User) => Promise<boolean>;
  deletedUser: (userId: string) => Promise<boolean>;

  createdSport: (userId: string, sport: ISportWithSportRef) => Promise<boolean>;
  updatedSport: (userId: string, sport: ISportWithSportRef) => Promise<boolean>;
  deletedSport: (userId: string, sportId: number) => Promise<boolean>;

  updatedLocation: (userId: string, location: Location) => Promise<boolean>;

  createdTag: (userId: string, tag: ITagWithTagRef) => Promise<boolean>;
  deletedTag: (userId: string, tagId: number) => Promise<boolean>;

  createdVita: (userId: string, vita: Vita) => Promise<boolean>;
  updatedVita: (userId: string, vita: Vita) => Promise<boolean>;
  daletedVita: (userId: string, vitaId: number) => Promise<boolean>;

  updateReiveMeta: (userId: string, reviewMeta: ReviewMeta) => Promise<boolean>;

  createdImage: (image: IImageWithLocation) => Promise<boolean>;

  createdReview: (reviewDatabase: IReviewWithAuthor) => Promise<boolean>;
  createdReviewResponse: (reviewResponse: ReviewResponse) => Promise<boolean>;
};
export type SvixPayloadDatabase =
  | IUserDatabaseCreated
  | IUserDatabaseUpdated
  | IUserDatabaseDeleted
  | ISportCreated
  | ISportUpdated
  | ISportDeleted
  | ITagCreate
  | ITagDelete
  | ILocationUpdate
  | IVitaCreated
  | IVitaUpdated
  | IVitaDeleted
  | IReviewMetaUpdated
  | IImageCreated
  | IReviewCreated
  | IReviewResponseCreated;

export type IUserDatabaseCreated = {
  type: 'user.database.created';
  data: {
    user: User;
  };
};

export type IUserDatabaseUpdated = {
  type: 'user.database.updated';
  data: {
    user: User;
  };
};

export type IUserDatabaseDeleted = {
  type: 'user.database.deleted';
  data: {
    userId: string;
  };
};

export type ISportCreated = {
  type: 'user.sport.created';
  data: {
    userId: string;
    sport: ISportWithSportRef;
  };
};

export type ISportUpdated = {
  type: 'user.sport.updated';
  data: {
    userId: string;
    sport: ISportWithSportRef;
  };
};

export type ISportDeleted = {
  type: 'user.sport.deleted';
  data: {
    userId: string;
    sportId: number;
  };
};

export type ILocationUpdate = {
  type: 'user.location.updated';
  data: {
    userId: string;
    location: Location;
  };
};

export type ITagCreate = {
  type: 'user.tag.created';
  data: {
    userId: string;
    tag: ITagWithTagRef;
  };
};

export type ITagDelete = {
  type: 'user.tag.deleted';
  data: {
    userId: string;
    tagId: number;
  };
};

export type IVitaCreated = {
  type: 'user.vita.created';
  data: {
    userId: string;
    vita: Vita;
  };
};

export type IVitaUpdated = {
  type: 'user.vita.updated';
  data: {
    userId: string;
    vita: Vita;
  };
};

export type IVitaDeleted = {
  type: 'user.vita.deleted';
  data: {
    userId: string;
    vitaId: number;
  };
};

export type IReviewMetaUpdated = {
  type: 'user.reviewMeta.updated';
  data: {
    userId: string;
    reviewMeta: ReviewMeta;
  };
};

export type IImageCreated = {
  type: 'image.created';
  data: {
    image: IImageWithLocation;
  };
};

export type IReviewCreated = {
  type: 'review.created';
  data: {
    review: IReviewWithAuthor;
  };
};

export type IReviewResponseCreated = {
  type: 'review.response.created';
  data: {
    reviewResponse: ReviewResponse;
  };
};
