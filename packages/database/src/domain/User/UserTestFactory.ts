import { name, datatype } from 'faker';
import type { User } from '@prisma/client';
import { AuthTestFactory, IUserAuth } from '@sportsguide/auth';
import { UserHelper } from './UserHelper';

/**
 * Generates User Test Data
 */
export class UserTestFactory {
  users: User[] = [];

  constructor() {
    this.users = this.userTestDataCreation();
  }

  generateUserId = () => datatype.uuid();

  /**
   * Get a list of User Database
   *
   * @returns a list of Database Users mapped to the Prisma Schema
   */
  getUserTestData = () => this.users;

  /**
   * Generates User Create Data for a new User
   *
   * @returns
   */
  getUserCreateData = (): IUserAuth => AuthTestFactory.generateClerkUser();

  mapUserCreateInput = (userClerk: IUserAuth): User => {
    const user: User = {
      firstName: userClerk.first_name,
      lastName: userClerk.last_name,
      id: userClerk.id,
      isGuide: false,
      isBlacklisted: false,
      username: UserHelper.createInitialUsername(
        userClerk.first_name,
        userClerk.last_name
      ),
      updatedAt: new Date(),
      createdAt: new Date()
    };
    return user;
  };

  private userTestDataCreation = (): User[] => {
    const users: User[] = [];
    const firstName = name.lastName();
    const lastName = name.firstName();
    const maxUser = 5;

    for (let i = 0; i < maxUser; i += 1) {
      const user: User = {
        id: this.generateUserId(),
        firstName,
        lastName,
        createdAt: new Date(),
        updatedAt: new Date(),
        isBlacklisted: false,
        isGuide: datatype.boolean(),
        username: UserHelper.createInitialUsername(firstName, lastName)
      };
      users.push(user);
    }

    return users;
  };
}
