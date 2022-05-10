import { Logger } from '@sportsguide/lib';
import type { User } from '@prisma/client';
import type { IUserAuth } from '@sportsguide/auth';
import prismaClient from '../../lib/prisma';
import type { IUserDatabase } from './types';
import { UserHelper } from './UserHelper';

class UserDatabase implements IUserDatabase {
  createUser = async (userAuth: IUserAuth): Promise<User> => {
    try {
      const user = await prismaClient.user.create({
        data: {
          id: userAuth.id,
          firstName: userAuth.first_name,
          lastName: userAuth.last_name,
          username: UserHelper.createInitialUsername(
            userAuth.first_name,
            userAuth.last_name
          )
        }
      });

      return user;
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  };

  updateUser = async (userAuth: IUserAuth): Promise<User> => {
    try {
      const user = await prismaClient.user.update({
        data: {
          firstName: userAuth.first_name,
          lastName: userAuth.last_name,
          username: userAuth.username
        },
        where: {
          id: userAuth.id
        }
      });

      return user;
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  };

  deleteUser = async (userId: string): Promise<boolean> => {
    try {
      await prismaClient.user.delete({
        where: {
          id: userId
        }
      });
      return true;
    } catch (error) {
      Logger.error(error);
      return false;
    }
  };

  getCurrentUsername = async (userId: string): Promise<string> => {
    try {
      const user = await prismaClient.user.findUnique({
        where: {
          id: userId
        }
      });

      if (!user) {
        throw new Error('USER_SERVICE_NOT_FOUND');
      }

      return user?.username;
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  };

  getUserByUsername = async (username: string): Promise<User> => {
    try {
      const user = await prismaClient.user.findUnique({
        where: {
          username
        }
      });

      if (!user) {
        throw new Error('USER_SERVICE_NOT_FOUND');
      }

      return user;
    } catch (error) {
      Logger.error('error', error);
      throw error;
    }
  };
}
export { UserDatabase };
