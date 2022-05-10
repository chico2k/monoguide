import { Container, Service } from 'typedi';
import { ValidationError } from 'apollo-server-lambda';
import type { IUserElasticSearchResponse } from '@sportsguide/elastic';
import { UserService } from './service';
import type { IContext } from '../../lib/apolloServer/types';
import type { UserDetailResponse } from './types';

@Service()
class UserController {
  userService = Container.get(UserService);

  getUserDetailController = async (
    username: string,
    ctx: IContext
  ): Promise<UserDetailResponse> => {
    console.log('username', ctx);

    const userId = ctx.auth.getUserId();

    const userOrError = await this.userService.getUserDetailService(
      username,
      userId
    );
    switch (userOrError.type) {
      case 'UserErrorNotFound':
        throw new ValidationError('SPORT_SERVICE_FAILED');
      case 'UserErrorUnexpected':
        throw new ValidationError('SPORT_SERVICE_FAILED');
      default:
    }

    return userOrError.output;
  };

  getUserListController = async (): Promise<IUserElasticSearchResponse> => {
    const userListOrError = await this.userService.getUserListService();

    switch (userListOrError.type) {
      case 'UserErrorUnexpected':
        throw new ValidationError('SPORT_SERVICE_FAILED');
      default:
    }
    return userListOrError.output;
  };

  getCurrentUsernameController = async (userId: string): Promise<string> => {
    const userNameOrError = await this.userService.getCurrentUsernameService(
      userId
    );

    switch (userNameOrError.type) {
      case 'UserErrorUnexpected':
        throw new ValidationError('SPORT_SERVICE_FAILED');
      default:
    }

    return userNameOrError.output;
  };
}

export { UserController };
