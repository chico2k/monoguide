import type { User } from '@prisma/client';
import type { IUserAuth } from '@sportsguide/auth';

export interface IUserDatabase {
  createUser: (userClerk: IUserAuth) => Promise<User>;
  updateUser: (userClerk: IUserAuth) => Promise<User>;
  deleteUser: (userId: string) => Promise<boolean>;

  getCurrentUsername: (userId: string) => Promise<string>;

  getUserByUsername: (username: string) => Promise<User>;
}

export interface ICreateUserInput {
  name: string;
  sub: string;
  is_guide: boolean;
  is_confirmed: boolean;
}
