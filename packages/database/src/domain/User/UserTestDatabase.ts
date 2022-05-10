import type { User } from '@prisma/client';
import { produce } from 'immer';
import type { IUserAuth } from '@sportsguide/auth';
import type { IUserDatabase } from './types';
import { UserTestFactory } from './UserTestFactory';

class UserTestDatabase implements IUserDatabase {
  user: User[] = [];

  getUser = () => this.user;

  createUser = async (userClerk: IUserAuth): Promise<User> => {
    const userTestFactory = new UserTestFactory();

    const newUser = userTestFactory.mapUserCreateInput(userClerk);

    this.user = produce(this.user, (draft) => {
      draft.push(newUser);
    });

    return newUser;
  };

  updateUser = async (userClerk: IUserAuth): Promise<User> => {
    const userTestFactory = new UserTestFactory();

    const updatedUser = userTestFactory.mapUserCreateInput(userClerk);
    const index = this.user.findIndex((user) => user.id === userClerk.id);

    this.user = produce(this.user, (draft) => {
      draft[index] = updatedUser;
    });

    return updatedUser;
  };

  deleteUser = async (userId: string) => {
    const index = this.user.findIndex((user) => user.id === userId);

    if (index === -1) return false;
    this.user = produce(this.user, (draft) => {
      if (index !== -1) draft.splice(index, 1);
    });

    return true;
  };

  getCurrentUsername = async (userId: string): Promise<string> => {
    const index = this.user.findIndex((user) => user.id === userId);

    return this.user[index].username;
  };

  getUserByUsername = async (username: string): Promise<User> => {
    const index = this.user.findIndex((user) => user.username === username);

    return this.user[index];
  };
}

export { UserTestDatabase };
