import { Svix, Webhook as SvixWebhook } from 'svix';
import type {
  Location,
  ReviewMeta,
  ReviewResponse,
  Vita,
} from '@prisma/client';
import type {
  ISportCreated,
  ISportUpdated,
  ISportDeleted,
  ILocationUpdate,
  ITagCreate,
  ITagDelete,
  SvixPayloadDatabase,
  IUserDatabaseCreated,
  IVitaUpdated,
  IVitaDeleted,
  IVitaCreated,
  IReviewMetaUpdated,
  IUserDatabaseUpdated,
  IUserDatabaseDeleted,
  IWebhookDatabase,
  IImageCreated,
  IReviewCreated,
  IReviewResponseCreated,
} from './types';
import type { Request } from 'express';
import { Service } from 'typedi';
import type {
  IImageWithLocation,
  IReviewWithAuthor,
  ISportWithSportRef,
  ITagWithTagRef,
} from '@sportsguide/database';
import { Logger } from '@sportsguide/lib';
import type { IEventTypesDatabase } from './types';
import type { User } from '@prisma/client';
import dotenv from 'dotenv';
import path from 'path';


const pathToEnv = path.join(
  __dirname,
  '..',
  '..',
  "..",
  "..",
  '.env'
);

dotenv.config({ path: pathToEnv });


const appId = process.env.WH_AP_ID as string;
const secretSvix = process.env.WH_SECRET as string;
const secretEndpointDatabase = process.env.WH_KEY_DB as string;

console.log("secretSvix", secretSvix)
console.log("secretEndpointDatabase", secretEndpointDatabase)
console.log("appId", appId)

@Service()
class WebhookDatabase implements IWebhookDatabase {
  constructor(
    private svix = new Svix(secretSvix),
    private wh = new SvixWebhook(secretEndpointDatabase)
  ) { }

  eventTypes: IEventTypesDatabase = {
    // User
    'user.database.created': 'user.database.created',
    'user.database.updated': 'user.database.updated',
    'user.database.deleted': 'user.database.deleted',
    // Sport
    'user.sport.created': 'user.sport.created',
    'user.sport.updated': 'user.sport.updated',
    'user.sport.deleted': 'user.sport.deleted',
    // Location
    'user.location.updated': 'user.location.updated',
    //Tag
    'user.tag.created': 'user.tag.created',
    'user.tag.deleted': 'user.tag.deleted',
    // Vita
    'user.vita.created': 'user.vita.created',
    'user.vita.updated': 'user.vita.updated',
    'user.vita.deleted': 'user.vita.deleted',
    // ReviewMeta
    'user.reviewMeta.updated': 'user.reviewMeta.updated',
    // Image
    'image.created': 'image.created',
    // Review
    'review.created': 'review.created',
    'review.response.created': 'review.response.created',
  };

  verify = (request: Request): SvixPayloadDatabase => {
    const payload = request.body;
    const headers = request.headers;

    return this.wh.verify(payload, headers) as SvixPayloadDatabase;
  };

  createdUser = async (user: User): Promise<boolean> => {
    const payload: IUserDatabaseCreated = {
      type: this.eventTypes['user.database.created'],
      data: { user },
    };

    try {
      await this.svix.message.create(appId, {
        eventType: this.eventTypes['user.database.created'],
        payload,
      });
      return true;
    } catch (error) {
      Logger.info(payload);
      Logger.error(error);
      return false;
    }
  };

  upatedUser = async (user: User): Promise<boolean> => {
    const payload: IUserDatabaseUpdated = {
      type: this.eventTypes['user.database.updated'],
      data: { user },
    };

    try {
      await this.svix.message.create(appId, {
        eventType: this.eventTypes['user.database.updated'],
        payload,
      });
      return true;
    } catch (error) {
      Logger.info(payload);
      Logger.error(error);
      return false;
    }
  };
  deletedUser = async (userId: string): Promise<boolean> => {
    const payload: IUserDatabaseDeleted = {
      type: this.eventTypes['user.database.deleted'],
      data: { userId },
    };

    try {
      await this.svix.message.create(appId, {
        eventType: this.eventTypes['user.database.updated'],
        payload,
      });
      return true;
    } catch (error) {
      Logger.info(payload);
      Logger.error(error);
      return false;
    }
  };

  createdSport = async (
    userId: string,
    sport: ISportWithSportRef
  ): Promise<boolean> => {
    const payload: ISportCreated = {
      type: this.eventTypes['user.sport.created'],
      data: {
        userId,
        sport,
      },
    };

    try {
      await this.svix.message.create(appId, {
        eventType: this.eventTypes['user.sport.created'],
        payload,
      });
      return true;
    } catch (error) {
      Logger.info(payload);
      Logger.error(error);
      return false;
    }
  };

  updatedSport = async (
    userId: string,
    sport: ISportWithSportRef
  ): Promise<boolean> => {
    const payload: ISportUpdated = {
      type: this.eventTypes['user.sport.updated'],
      data: {
        userId,
        sport,
      },
    };
    try {
      await this.svix.message.create(appId, {
        eventType: this.eventTypes['user.sport.updated'],
        payload,
      });

      return true;
    } catch (error) {
      Logger.info(payload);
      Logger.error(error);
      return false;
    }
  };

  deletedSport = async (userId: string, sportId: number): Promise<boolean> => {
    const payload: ISportDeleted = {
      type: this.eventTypes['user.sport.deleted'],
      data: {
        userId,
        sportId,
      },
    };
    try {
      await this.svix.message.create(appId, {
        eventType: this.eventTypes['user.sport.deleted'],
        payload,
      });
      return true;
    } catch (error) {
      Logger.info(payload);
      Logger.error(error);
      return false;
    }
  };

  updatedLocation = async (
    userId: string,
    location: Location
  ): Promise<boolean> => {
    const payload: ILocationUpdate = {
      type: this.eventTypes['user.location.updated'],
      data: {
        userId,
        location,
      },
    };
    try {
      await this.svix.message.create(appId, {
        eventType: this.eventTypes['user.location.updated'],
        payload,
      });
      return true;
    } catch (error) {
      Logger.info(payload);
      Logger.error(error);
      return false;
    }
  };

  createdTag = async (
    userId: string,
    tag: ITagWithTagRef
  ): Promise<boolean> => {
    const payload: ITagCreate = {
      type: this.eventTypes['user.tag.created'],
      data: {
        userId,
        tag,
      },
    };
    try {
      await this.svix.message.create(appId, {
        payload,
        eventType: this.eventTypes['user.tag.created'],
      });
      return true;
    } catch (error) {
      Logger.info(payload);
      Logger.error(error);
      return false;
    }
  };

  deletedTag = async (userId: string, tagId: number): Promise<boolean> => {
    const payload: ITagDelete = {
      type: this.eventTypes['user.tag.deleted'],
      data: {
        userId,
        tagId,
      },
    };
    try {
      await this.svix.message.create(appId, {
        eventType: this.eventTypes['user.tag.deleted'],
        payload,
      });
      return true;
    } catch (error) {
      Logger.info(payload);
      Logger.error(error);
      return false;
    }
  };

  createdVita = async (userId: string, vita: Vita): Promise<boolean> => {
    const payload: IVitaCreated = {
      type: this.eventTypes['user.vita.created'],
      data: {
        userId,
        vita,
      },
    };
    try {
      await this.svix.message.create(appId, {
        eventType: this.eventTypes['user.vita.created'],
        payload,
      });
      return true;
    } catch (error) {
      Logger.info(payload);
      Logger.error(error);
      return false;
    }
  };

  updatedVita = async (userId: string, vita: Vita): Promise<boolean> => {
    const payload: IVitaUpdated = {
      type: this.eventTypes['user.vita.updated'],
      data: {
        userId,
        vita,
      },
    };
    try {
      await this.svix.message.create(appId, {
        eventType: this.eventTypes['user.vita.updated'],
        payload,
      });
      return true;
    } catch (error) {
      Logger.info(payload);
      Logger.error(error);
      return false;
    }
  };

  daletedVita = async (userId: string, vitaId: number): Promise<boolean> => {
    const payload: IVitaDeleted = {
      type: this.eventTypes['user.vita.deleted'],
      data: {
        userId,
        vitaId,
      },
    };
    try {
      await this.svix.message.create(appId, {
        eventType: this.eventTypes['user.vita.deleted'],
        payload,
      });
      return true;
    } catch (error) {
      Logger.info(payload);
      Logger.error(error);
      return false;
    }
  };

  updateReiveMeta = async (
    userId: string,
    reviewMeta: ReviewMeta
  ): Promise<boolean> => {
    const payload: IReviewMetaUpdated = {
      type: this.eventTypes['user.reviewMeta.updated'],
      data: {
        userId,
        reviewMeta,
      },
    };
    try {
      await this.svix.message.create(appId, {
        eventType: this.eventTypes['user.reviewMeta.updated'],
        payload,
      });
      return true;
    } catch (error) {
      Logger.info(payload);
      Logger.error(error);
      return false;
    }
  };

  createdImage = async (image: IImageWithLocation): Promise<boolean> => {
    const payload: IImageCreated = {
      type: this.eventTypes['image.created'],
      data: {
        image,
      },
    };
    try {
      await this.svix.message.create(appId, {
        eventType: this.eventTypes['image.created'],
        payload,
      });
      return true;
    } catch (error) {
      Logger.info(payload);
      Logger.error(error);
      return false;
    }
  };
  createdReview = async (review: IReviewWithAuthor): Promise<boolean> => {
    const payload: IReviewCreated = {
      type: this.eventTypes['review.created'],
      data: {
        review,
      },
    };
    try {
      await this.svix.message.create(appId, {
        eventType: this.eventTypes['review.created'],
        payload,
      });
      return true;
    } catch (error) {
      Logger.info(payload);
      Logger.error(error);
      return false;
    }
  };

  createdReviewResponse = async (
    reviewResponse: ReviewResponse
  ): Promise<boolean> => {
    const payload: IReviewResponseCreated = {
      type: this.eventTypes['review.response.created'],
      data: {
        reviewResponse,
      },
    };
    try {
      await this.svix.message.create(appId, {
        eventType: this.eventTypes['review.response.created'],
        payload,
      });
      return true;
    } catch (error) {
      Logger.info(payload);
      Logger.error(error);
      return false;
    }
  };
}

export { WebhookDatabase };
