import 'reflect-metadata';
import type { IReviewElastic, IUserElastic } from '@sportsguide/elastic';
import { Logger } from '@sportsguide/lib';
import type { IUserDatabase } from '@sportsguide/database';
import { Inject, Service } from 'typedi';
import type {
  IUserDetaileOutput,
  IUserCurrentUsernameOutput,
  IUserListOutput
} from './types';
import { ContainerInjection } from '../../lib/ContainerInjection';

@Service()
export class UserService {
  constructor(
    @Inject(ContainerInjection.containerNames.DB_USER)
    private readonly userDatabase: IUserDatabase,
    @Inject(ContainerInjection.containerNames.ES_USER)
    private readonly elasticUser: IUserElastic,
    @Inject(ContainerInjection.containerNames.ES_REVIEW)
    private readonly elasticReview: IReviewElastic
  ) {}

  getUserDetailService = async (
    username: string,
    userId: string | undefined
  ): Promise<IUserDetaileOutput> => {
    try {
      const userOrError = await this.elasticUser.getUserDetail(username);
      if (userOrError.type === 'UserDetailError')
        return {
          type: 'UserErrorUnexpected'
        };

      const user = userOrError.output.hits.hits[0]._source;

      let hasReviewed = false;
      let myUser = false;

      if (!user)
        return {
          type: 'UserErrorNotFound'
        };

      if (!userId)
        return {
          type: 'UserSuccessDetail',
          output: {
            user,
            userMeta: {
              myUser,
              hasReviewed
            }
          }
        };

      const hasReviewedOrError = await this.elasticReview.userHasReviewed(
        userId,
        user.id
      );

      if (hasReviewedOrError.type === 'ReviewHasReviewedError')
        return {
          type: 'UserErrorUnexpected'
        };

      hasReviewed = hasReviewedOrError.output;
      myUser = user.id === userId;

      return {
        type: 'UserSuccessDetail',
        output: {
          user,
          userMeta: {
            myUser,
            hasReviewed
          }
        }
      };
    } catch (error) {
      Logger.error('error', error);
      return {
        type: 'UserErrorUnexpected'
      };
    }
  };

  getUserListService = async (): Promise<IUserListOutput> => {
    try {
      const response = await this.elasticUser.getUserList();

      console.log('getUserListService', response);

      if (response.type === 'UserListError')
        return {
          type: 'UserErrorUnexpected'
        };

      return {
        type: 'UserSuccessList',
        output: response.output
      };
    } catch (error) {
      Logger.error('error', error);
      return {
        type: 'UserErrorUnexpected'
      };
    }
  };

  getCurrentUsernameService = async (
    userId: string
  ): Promise<IUserCurrentUsernameOutput> => {
    try {
      const userName = await this.userDatabase.getCurrentUsername(userId);
      return {
        type: 'UserSuccessCurrentUsername',
        output: userName
      };
    } catch (error) {
      Logger.error('error', error);
      return {
        type: 'UserErrorUnexpected'
      };
    }
  };
}
