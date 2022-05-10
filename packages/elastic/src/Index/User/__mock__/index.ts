import type { ISportWithSportRef, ITagWithTagRef } from '@sportsguide/database';
import { produce } from 'immer';
import { Logger } from '@sportsguide/lib';
import type { Location, ReviewMeta, Vita, User } from '@prisma/client';
import { elasticUserSeed } from './data';
import { UserMapper } from '../../../Mapper/user';
import type {
  IUserElasticDocument,
  IUserElasticSearchResponse,
  IUserDetailOutput,
  IUserElastic,
  IUserListOutput
} from '../../../types/user';

class UserElasticMock implements IUserElastic {
  users: IUserElasticDocument[] = elasticUserSeed;

  getUsersHelper = () => this.users;

  getUserDetailelper = (userId: string): IUserElasticDocument => {
    const user = this.users.find((user) => user.id === userId);
    if (!user)
      throw new Error(`User with userId: ${userId} could not be found`);

    return user;
  };

  private convertUsersToSearchResponse = (
    users: IUserElasticDocument[]
  ): IUserElasticSearchResponse => {
    const searchResponse: IUserElasticSearchResponse = {
      took: 1,
      timed_out: false,
      _shards: {
        failed: 0,
        successful: 1,
        total: 1,
        skipped: 0
      },
      hits: {
        hits: this.convertUsers(users),
        total: this.users.length
      }
    };

    return searchResponse;
  };

  private convertUsers = (users: IUserElasticDocument[]) => {
    const convertedUser = users.map((user) => ({
      _id: `${user.id}`,
      _index: 'user',
      _source: { ...user }
    }));
    return convertedUser;
  };

  getUserList = async (): Promise<IUserListOutput> => ({
    type: 'UserListSuccess',
    output: this.convertUsersToSearchResponse(this.users)
  });

  createUser = async (user: User): Promise<boolean> => {
    const newUser: IUserElasticDocument = {
      id: user.id,
      username: user.username,
      firstName: 'name',
      lastName: 'name',
      createdAt: new Date(),
      isGuide: true,
      isBlacklisted: false,
      sport: [],
      location: null,
      tag: [],
      avatar: null,
      reviewMeta: null,
      vita: []
    };

    this.users = produce(this.users, (draft) => {
      draft.push(newUser);
    });
    return true;
  };

  deleteUser = async (userId: string): Promise<boolean> => {
    const userIndex = this.users.findIndex((user) => user.id === userId);

    if (userIndex === -1) return false;
    this.users = produce(this.users, (draft) => {
      draft.splice(userIndex, 1);
    });
    return true;
  };

  getUserDetail = async (username: string): Promise<IUserDetailOutput> => {
    const index = this.users.findIndex((user) => user.username === username);

    if (index === -1)
      return {
        type: 'UserDetailError'
      };

    return {
      type: 'UserDetailSuccess',
      output: this.convertUsersToSearchResponse([this.users[index]])
    };
  };

  createSport = async (
    userId: string,
    sportDatabase: ISportWithSportRef
  ): Promise<boolean> => {
    try {
      const userIndex = this.users.findIndex((user) => user.id === userId);
      if (userIndex === -1) return false;

      const mappedSport = UserMapper.mapSport(sportDatabase);

      this.users = produce(this.users, (draft) => {
        draft[userIndex].sport.push(mappedSport);
      });

      return true;
    } catch (error) {
      Logger.error('error', error);
      return false;
    }
  };

  updateSport = async (
    userId: string,
    sportDatabase: ISportWithSportRef
  ): Promise<boolean> => {
    try {
      const mappedSport = UserMapper.mapSport(sportDatabase);

      const userIndex = this.users.findIndex((user) => user.id === userId);
      if (userIndex === -1) return false;

      const currentSports = this.users[userIndex].sport;

      const sportIndex = currentSports.findIndex(
        (sport) => sport.id === mappedSport.id
      );

      if (sportIndex === -1) return false;

      const updatedSport = produce(currentSports, (draft) => {
        draft[sportIndex] = mappedSport;
      });

      this.users = produce(this.users, (draft) => {
        draft[userIndex].sport = updatedSport;
      });

      return true;
    } catch (error) {
      Logger.error('error', error);
      return false;
    }
  };

  deleteSport = async (userId: string, sportId: number): Promise<boolean> => {
    try {
      const userIndex = this.users.findIndex((user) => user.id === userId);
      if (userIndex === -1) return false;

      const currentSports = this.users[userIndex].sport;
      if (!currentSports) return false;

      const sportIndex = currentSports.findIndex(
        (sport) => sport.id === sportId
      );

      if (sportIndex === -1) return false;

      this.users = produce(this.users, (draft) => {
        draft[userIndex].sport.splice(sportIndex, 1);
      });

      return true;
    } catch (error) {
      Logger.error('error', error);
      return false;
    }
  };

  updateLocation = async (
    userId: string,
    location: Location
  ): Promise<boolean> => {
    try {
      /**
       * Find User
       */
      const userIndex = this.users.findIndex((user) => user.id === userId);
      if (userIndex === -1) return false;

      const mappedLocation = UserMapper.mapLocation(location);

      this.users = produce(this.users, (draft) => {
        draft[userIndex].location = mappedLocation;
      });
      return true;
    } catch (error) {
      Logger.error('error', error);
      return false;
    }
  };

  createTag = async (userId: string, tag: ITagWithTagRef): Promise<boolean> => {
    try {
      const mappedTag = UserMapper.mapTag(tag);

      const userIndex = this.users.findIndex((user) => user.id === userId);
      if (userIndex === -1) return false;

      this.users = produce(this.users, (draft) => {
        draft[userIndex].tag.push(mappedTag);
      });
      return true;
    } catch (error) {
      Logger.error('error', error);
      return false;
    }
  };

  deleteTag = async (userId: string, tagId: number): Promise<boolean> => {
    try {
      const userIndex = this.users.findIndex((user) => user.id === userId);
      if (userIndex === -1) return false;

      const currentTags = this.users[userIndex].tag;
      if (!currentTags) return false;

      const tagIndex = currentTags.findIndex((tag) => tag.id === tagId);

      if (tagIndex === -1) return false;

      this.users = produce(this.users, (draft) => {
        draft[userIndex].tag.splice(tagIndex, 1);
      });

      return true;
    } catch (error) {
      Logger.error('error', error);
      return false;
    }
  };

  createVita = async (userId: string, vita: Vita): Promise<boolean> => {
    try {
      const mappedVita = UserMapper.mapVita(vita);
      const userIndex = this.users.findIndex((user) => user.id === userId);
      if (userIndex === -1) return false;

      this.users = produce(this.users, (draft) => {
        draft[userIndex].vita.push(mappedVita);
      });

      return true;
    } catch (error) {
      Logger.error('error', error);
      return false;
    }
  };

  updateVita = async (userId: string, vita: Vita): Promise<boolean> => {
    try {
      const mappedVita = UserMapper.mapVita(vita);

      const userIndex = this.users.findIndex((user) => user.id === userId);
      if (userIndex === -1) return false;

      const currentVita = this.users[userIndex].vita;

      const vitaIndex = currentVita.findIndex(
        (vita) => vita.id === mappedVita.id
      );

      if (vitaIndex === -1) return false;

      const updatedVita = produce(currentVita, (draft) => {
        draft[vitaIndex] = mappedVita;
      });

      this.users = produce(this.users, (draft) => {
        draft[userIndex].vita = updatedVita;
      });

      return true;
    } catch (error) {
      Logger.error('error', error);
      return false;
    }
  };

  deleteVita = async (userId: string, vitaId: number): Promise<boolean> => {
    try {
      const userIndex = this.users.findIndex((user) => user.id === userId);
      if (userIndex === -1) return false;

      const currentVita = this.users[userIndex].vita;

      if (!currentVita) return false;

      const vitaIndex = currentVita.findIndex((vita) => vita.id === vitaId);
      if (vitaIndex === -1) return false;

      this.users = produce(this.users, (draft) => {
        draft[userIndex].vita.splice(vitaIndex, 1);
      });
      return true;
    } catch (error) {
      Logger.error('error', error);
      return false;
    }
  };

  updateReviewMeta = async (
    userId: string,
    reviewMeta: ReviewMeta
  ): Promise<boolean> => {
    try {
      const mappedReviewMeta = UserMapper.mapReviewMeta(reviewMeta);

      /**
       * Find User
       */
      const userIndex = this.users.findIndex((user) => user.id === userId);
      if (userIndex === -1) return false;

      this.users = produce(this.users, (draft) => {
        draft[userIndex].reviewMeta = mappedReviewMeta;
      });
      return true;
    } catch (error) {
      Logger.error('error', error);
      return false;
    }
  };
}

export { UserElasticMock };
