import { SvixPayloadClerk, WebhookClerk } from '@sportsguide/webhook';
import { Logger } from '@sportsguide/lib';
import Container, { Service } from 'typedi';
import { UserDatabase } from '@sportsguide/database';
import { ClerkService } from '../../service/clerk';

@Service()
class ClerController {
  webhook = Container.get(WebhookClerk);

  clerkService = Container.get(ClerkService);

  constructor(private userDatabase = new UserDatabase()) {}

  execute = async (message: SvixPayloadClerk): Promise<boolean> => {
    let responseStatus: boolean;

    try {
      switch (message.type) {
        case this.webhook.eventTypes['user.created']:
          responseStatus = await this.clerkService.userCreatedService(
            message.data
          );

          break;
        case this.webhook.eventTypes['user.updated']:
          responseStatus = await this.clerkService.userUpdatedService(
            message.data
          );
          break;
        case this.webhook.eventTypes['user.deleted']:
          responseStatus = await this.userDatabase.deleteUser(message.data.id);
          responseStatus = true;

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
export { ClerController };
