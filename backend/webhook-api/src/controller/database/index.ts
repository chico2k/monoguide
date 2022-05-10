import { UserElastic } from '@sportsguide/elastic';
import { WebhookDatabase } from '@sportsguide/webhook';
import type { SvixPayloadDatabase } from '@sportsguide/webhook/';
import { Service, Container } from 'typedi';
import { Logger } from '@sportsguide/database/node_modules/@sportsguide/lib';
import { DatabaseService } from '../../service/database';

@Service()
class DatabaseController {
  webhook = Container.get(WebhookDatabase);

  databaseService = Container.get(DatabaseService);

  constructor(private userElastic = new UserElastic()) {}

  execute = async (message: SvixPayloadDatabase): Promise<boolean> => {
    Logger.info('DatabaseController executed');
    let responseStatus: boolean;
    try {
      switch (message.type) {
        case this.webhook.eventTypes['user.database.created']:
          responseStatus = await this.databaseService.userCreated(
            message.data.user
          );

          break;
        case this.webhook.eventTypes['user.database.updated']:
          responseStatus = await this.databaseService.updateUser(
            message.data.user
          );

          break;
        case this.webhook.eventTypes['user.database.deleted']:
          responseStatus = await this.databaseService.deleteUser(
            message.data.userId
          );

          break;
        case this.webhook.eventTypes['user.sport.created']:
          responseStatus = await this.databaseService.createSport(
            message.data.userId,
            message.data.sport
          );
          break;
        case this.webhook.eventTypes['user.sport.updated']:
          responseStatus = await this.databaseService.updateSport(
            message.data.userId,
            message.data.sport
          );
          break;
        case this.webhook.eventTypes['user.sport.deleted']:
          responseStatus = await this.databaseService.deleteSport(
            message.data.userId,
            message.data.sportId
          );
          break;
        case this.webhook.eventTypes['user.location.updated']:
          responseStatus = await this.databaseService.updateLocation(
            message.data.userId,
            message.data.location
          );
          break;
        case this.webhook.eventTypes['user.vita.created']:
          responseStatus = await this.databaseService.createVita(
            message.data.userId,
            message.data.vita
          );
          break;
        case this.webhook.eventTypes['user.vita.updated']:
          responseStatus = await this.databaseService.updateVita(
            message.data.userId,
            message.data.vita
          );
          break;
        case this.webhook.eventTypes['user.vita.deleted']:
          responseStatus = await this.databaseService.deleteVita(
            message.data.userId,
            message.data.vitaId
          );
          break;
        case this.webhook.eventTypes['user.tag.created']:
          responseStatus = await this.databaseService.createTag(
            message.data.userId,
            message.data.tag
          );
          break;
        case this.webhook.eventTypes['user.tag.deleted']:
          responseStatus = await this.databaseService.deleteTag(
            message.data.userId,
            message.data.tagId
          );
          break;

        case this.webhook.eventTypes['user.reviewMeta.updated']:
          responseStatus = await this.databaseService.updateReviewMeta(
            message.data.userId,
            message.data.reviewMeta
          );
          break;
        case this.webhook.eventTypes['image.created']:
          responseStatus = await this.databaseService.createImage(
            message.data.image
          );

          break;
        case this.webhook.eventTypes['review.created']:
          responseStatus = await this.databaseService.createReview(
            message.data.review
          );
          break;
        case this.webhook.eventTypes['review.response.created']:
          responseStatus = await this.databaseService.createReviewResponse(
            message.data.reviewResponse
          );
          break;

        default:
          responseStatus = false;
      }

      return responseStatus;
    } catch (error) {
      Logger.error(error);
      responseStatus = false;
      return responseStatus;
    }
  };
}

export { DatabaseController };
