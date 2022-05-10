import { UserDatabase } from '@sportsguide/database';
import { AuthProvider, IUserAuth } from '@sportsguide/auth';
import { WebhookDatabase } from '@sportsguide/webhook';
import Container, { Service } from 'typedi';
import { Logger } from '@sportsguide/lib';

@Service()
class ClerkService {
  webhook = Container.get(WebhookDatabase);

  clerkAuth = Container.get(AuthProvider);

  constructor(private userDatabase = new UserDatabase()) {}

  userCreatedService = async (userClerk: IUserAuth) => {
    try {
      const user = await this.userDatabase.createUser(userClerk);
      await this.clerkAuth.updateUsername(user);

      await this.webhook.createdUser(user);

      return true;
    } catch (error) {
      Logger.error(error);
      return false;
    }
  };

  userUpdatedService = async (userClerk: IUserAuth) => {
    try {
      const user = await this.userDatabase.updateUser(userClerk);

      await this.webhook.upatedUser(user);

      return true;
    } catch (error) {
      Logger.error(error);
      return false;
    }
  };

  userDeletedService = async (userClerk: IUserAuth) => {
    try {
      await this.userDatabase.deleteUser(userClerk.id);

      await this.webhook.deletedUser(userClerk.id);

      return true;
    } catch (error) {
      Logger.error(error);
      return false;
    }
  };
}
export { ClerkService };
