import type { IUserElasticSearchResponse } from '@sportsguide/elastic';
import { ObjectType, Field, InputType } from 'type-graphql';
import User from './graph';

@ObjectType('UserMeta')
class UserMeta {
  @Field(() => Boolean)
  myUser: boolean;

  @Field(() => Boolean)
  hasReviewed: boolean;
}

@ObjectType('UserDetailResponse')
export class UserDetailResponse {
  @Field(() => User)
  user: User;

  @Field(() => UserMeta)
  userMeta: UserMeta;
}

@ObjectType('ActiveUserDetail')
export class ActiveUserDetail {
  @Field(() => String)
  id: string;

  @Field(() => String)
  username: string;
}

@InputType()
export class UserCreateInput {
  @Field(() => String)
  sub: string;

  @Field(() => String)
  name: string;

  @Field(() => Boolean)
  is_guide: boolean;
}
/**
 *  User Error
 */
interface IUserErrorNotFound {
  type: 'UserErrorNotFound';
}

interface IUserErrorUnexpected {
  type: 'UserErrorUnexpected';
}

/**
 * User Create Success
 */
interface IUserSuccessDetail {
  type: 'UserSuccessDetail';
  output: {
    user: User;
    userMeta: UserMeta;
  };
}

/**
 * User Detail Output
 */

export type IUserDetaileOutput =
  | IUserErrorNotFound
  | IUserErrorUnexpected
  | IUserSuccessDetail;

/**
 * User List Success
 */
interface IUserListSuccess {
  type: 'UserSuccessList';
  output: IUserElasticSearchResponse;
}

/**
 * User List Output
 */
export type IUserListOutput = IUserListSuccess | IUserErrorUnexpected;

/**
 * User Current Username Success
 */
interface IUserSuccessCurrentUsername {
  type: 'UserSuccessCurrentUsername';
  output: string;
}

/**
 * User Current Username Output
 */
export type IUserCurrentUsernameOutput =
  | IUserSuccessCurrentUsername
  | IUserErrorUnexpected;
