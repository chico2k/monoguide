import { Resolver, Query, Arg, Ctx } from 'type-graphql';
import { Service, Container } from 'typedi';
import type { IContext } from '../../lib/apolloServer/types';
import { ActiveUserDetail, UserDetailResponse } from './types';
import User from './graph';
import ElasticResponse from '../../lib/types';
import { UserController } from './controller';

const UserListResponse = ElasticResponse(User);

@Service()
@Resolver()
export class UserResolver {
  userController = Container.get(UserController);

  @Query(() => ActiveUserDetail)
  async activeUserDetail(
    @Arg('username') username: string
  ): Promise<ActiveUserDetail> {
    return {
      id: username,
      username
    };
  }

  @Query(() => UserDetailResponse)
  async getUserDetail(
    @Ctx() ctx: IContext,
    @Arg('username', () => String) username: string
  ): Promise<UserDetailResponse> {
    return this.userController.getUserDetailController(username, ctx);
  }

  @Query(() => UserListResponse)
  async getUserList(): Promise<typeof UserListResponse> {
    return this.userController.getUserListController();
  }

  @Query(() => String)
  async getCurrentUsername(
    @Arg('userId', () => String) userId: string
  ): Promise<string> {
    return this.userController.getCurrentUsernameController(userId);
  }
}
