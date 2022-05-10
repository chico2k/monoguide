import type {
  Location,
  ReviewMeta,
  ReviewResponse,
  User,
  Vita
} from '@prisma/client';
import type {
  IImageWithLocation,
  IReviewWithAuthor,
  ISportWithSportRef,
  ITagWithTagRef
} from '@sportsguide/database';
import { ImageElastic, ReviewElastic, UserElastic } from '@sportsguide/elastic';
import { Logger } from '@sportsguide/lib';
import { Service } from 'typedi';

@Service()
class DatabaseService {
  constructor(
    private userElastic = new UserElastic(),
    private imageElastic = new ImageElastic(),
    private reviewElastic = new ReviewElastic()
  ) {}

  userCreated = async (user: User) => {
    try {
      await this.userElastic.createUser(user);
      return true;
    } catch (error) {
      Logger.error(error);
      return false;
    }
  };

  updateUser = async (user: User) => {
    try {
      await this.userElastic.createUser(user);
      return true;
    } catch (error) {
      Logger.error(error);
      return false;
    }
  };

  deleteUser = async (userId: string) => {
    try {
      await this.userElastic.deleteUser(userId);
      return true;
    } catch (error) {
      Logger.error(error);
      return false;
    }
  };

  createSport = async (userId: string, sport: ISportWithSportRef) => {
    try {
      await this.userElastic.createSport(userId, sport);
      return true;
    } catch (error) {
      Logger.error(error);
      return false;
    }
  };

  updateSport = async (userId: string, sport: ISportWithSportRef) => {
    try {
      await this.userElastic.updateSport(userId, sport);
      return true;
    } catch (error) {
      Logger.error(error);
      return false;
    }
  };

  deleteSport = async (userId: string, sportId: number) => {
    try {
      await this.userElastic.deleteSport(userId, sportId);
      return true;
    } catch (error) {
      Logger.error(error);
      return false;
    }
  };

  updateLocation = async (userId: string, location: Location) => {
    try {
      await this.userElastic.updateLocation(userId, location);
      return true;
    } catch (error) {
      Logger.error(error);
      return false;
    }
  };

  createTag = async (userId: string, tag: ITagWithTagRef) => {
    try {
      await this.userElastic.createTag(userId, tag);
      return true;
    } catch (error) {
      Logger.error(error);
      return false;
    }
  };

  deleteTag = async (userId: string, tagId: number) => {
    await this.userElastic.deleteTag(userId, tagId);
    try {
      return true;
    } catch (error) {
      Logger.error(error);
      return false;
    }
  };

  createVita = async (userId: string, vita: Vita) => {
    try {
      await this.userElastic.createVita(userId, vita);
      return true;
    } catch (error) {
      Logger.error(error);
      return false;
    }
  };

  updateVita = async (userId: string, vita: Vita) => {
    try {
      await this.userElastic.updateVita(userId, vita);
      return true;
    } catch (error) {
      Logger.error(error);
      return false;
    }
  };

  deleteVita = async (userId: string, vitaId: number) => {
    try {
      await this.userElastic.deleteVita(userId, vitaId);
      return true;
    } catch (error) {
      Logger.error(error);
      return false;
    }
  };

  updateReviewMeta = async (userId: string, reviewMeta: ReviewMeta) => {
    try {
      await this.userElastic.updateReviewMeta(userId, reviewMeta);
      return true;
    } catch (error) {
      Logger.error(error);
      return false;
    }
  };

  createImage = async (image: IImageWithLocation) => {
    try {
      await this.imageElastic.createImage(image);
      return true;
    } catch (error) {
      Logger.error(error);
      return false;
    }
  };

  createReview = async (review: IReviewWithAuthor) => {
    try {
      await this.reviewElastic.createReview(review);
      return true;
    } catch (error) {
      Logger.error(error);
      return false;
    }
  };

  createReviewResponse = async (reviewResponse: ReviewResponse) => {
    try {
      await this.reviewElastic.createReviewResponse(reviewResponse);
      return true;
    } catch (error) {
      Logger.error(error);
      return false;
    }
  };
}

export { DatabaseService };
