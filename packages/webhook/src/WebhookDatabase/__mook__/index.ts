import type {
  User,
  Location,
  Vita,
  ReviewResponse,
  ReviewMeta,
} from '@prisma/client';
import type {
  ISportWithSportRef,
  ITagWithTagRef,
  IImageWithLocation,
  IReviewWithAuthor,
} from '@sportsguide/database';
import { Service } from 'typedi';
import type {
  IEventTypesDatabase,
  IWebhookDatabase,
  SvixPayloadDatabase,
} from '../types';
import type { Request } from 'express';

@Service()
class WebhookDatabaseMook implements IWebhookDatabase {
  eventTypes: IEventTypesDatabase = {} as IEventTypesDatabase;

  verify = (_request: Request): SvixPayloadDatabase => {
    return {} as SvixPayloadDatabase;
  };

  createdUser = async (_user: User): Promise<boolean> => {
    return true;
  };
  upatedUser = async (_user: User): Promise<boolean> => {
    return true;
  };
  deletedUser = async (_userId: string): Promise<boolean> => {
    return true;
  };

  createdSport = async (
    _userId: string,
    _sport: ISportWithSportRef
  ): Promise<boolean> => {
    return true;
  };

  updatedSport = async (
    _userId: string,
    _sport: ISportWithSportRef
  ): Promise<boolean> => {
    return true;
  };

  deletedSport = async (
    _userId: string,
    _sportId: number
  ): Promise<boolean> => {
    return true;
  };

  updatedLocation = async (
    _userId: string,
    _location: Location
  ): Promise<boolean> => {
    return true;
  };

  createdTag = async (
    _userId: string,
    _tag: ITagWithTagRef
  ): Promise<boolean> => {
    return true;
  };

  deletedTag = async (_userId: string, _tagId: number): Promise<boolean> => {
    return true;
  };

  createdVita = async (_userId: string, _vita: Vita): Promise<boolean> => {
    return true;
  };

  updatedVita = async (_userId: string, _vita: Vita): Promise<boolean> => {
    return true;
  };

  daletedVita = async (_userId: string, _vitaId: number): Promise<boolean> => {
    return true;
  };

  updateReiveMeta = async (
    _userId: string,
    _reviewMeta: ReviewMeta
  ): Promise<boolean> => {
    return true;
  };

  createdImage = async (_image: IImageWithLocation): Promise<boolean> => {
    return true;
  };
  createdReview = async (_review: IReviewWithAuthor): Promise<boolean> => {
    return true;
  };

  createdReviewResponse = async (
    _reviewResponse: ReviewResponse
  ): Promise<boolean> => {
    return true;
  };
}

export { WebhookDatabaseMook };
