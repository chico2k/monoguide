import { Logger } from '@sportsguide/lib';
import type { Location, ReviewMeta, User, Vita } from '@prisma/client';
import type { ISportWithSportRef, ITagWithTagRef } from '@sportsguide/database';
import type {
  IUserElasticDocument,
  IUserElastic,
  IUserDetailOutput,
  IUserListOutput
} from '../../types/user';

import esClient from '../../client';
import { UserMapper } from '../../Mapper/user';
import { ConfigHandler } from '../../ConfigHandler';

/**
 * The User Elastic Index
 */
export class UserElastic implements IUserElastic {
  readIndex: string;

  writeIndex: string;

  constructor() {
    const indexType = 'user';

    this.readIndex = ConfigHandler.getReadAlias(indexType);
    this.writeIndex = ConfigHandler.getWriteAlias(indexType);
  }

  /**
   *
   *
   * @returns The List of Users from Elastic
   */
  getUserList = async (): Promise<IUserListOutput> => {
    try {
      const result = await esClient.search<IUserElasticDocument>({
        index: this.readIndex,
        body: {
          query: {
            bool: {
              must: [
                {
                  match: {
                    isBlacklisted: false
                  }
                }
              ]
            }
          }
        }
      });

      return {
        type: 'UserListSuccess',
        output: result.body
      };
    } catch (error) {
      Logger.error('error', error);
      return {
        type: 'UserListError'
      };
    }
  };

  /**
   * Get the User Detail from Elastic
   *
   * @param username
   * @returns
   */
  getUserDetail = async (username: string): Promise<IUserDetailOutput> => {
    try {
      const response = await esClient.search<IUserElasticDocument>({
        index: this.readIndex,
        body: {
          query: {
            bool: {
              must: [
                {
                  match: {
                    username
                  }
                }
              ]
            }
          }
        }
      });

      if (response.body.hits.hits.length === 0)
        return {
          type: 'UserDetailError'
        };

      return {
        type: 'UserDetailSuccess',
        output: response.body
      };
    } catch (error) {
      Logger.error('error', error);
      return {
        type: 'UserDetailError'
      };
    }
  };

  /**
   * Creates a single new User Document in Elastic Search
   *
   * @param user
   * @returns Promise<boolean>
   */
  createUser = async (user: User): Promise<boolean> => {
    try {
      const mappedUser = UserMapper.mapUser(user);
      Logger.info('Mapped User', mappedUser);
      await esClient.update({
        index: this.writeIndex,
        id: mappedUser.id,
        body: {
          doc: {
            ...mappedUser
          },
          doc_as_upsert: true
        },
        retry_on_conflict: 5
      });
      return true;
    } catch (error) {
      Logger.error('Error', error);
      return false;
    }
  };

  /**
   * Deletes a User in ElasticSearch
   *
   * @param userId
   * @returns
   */
  deleteUser = async (userId: string): Promise<boolean> => {
    try {
      await esClient.delete({
        index: this.writeIndex,
        id: userId
      });
      return true;
    } catch (error) {
      Logger.error('Error', error);
      return false;
    }
  };

  /**
   * Creates a single new sport entry for a User in Elastic Search
   *
   * @param userId
   * @param sportDatabase
   * @returns Promise<boolean>
   */
  createSport = async (
    userId: string,
    sportDatabase: ISportWithSportRef
  ): Promise<boolean> => {
    const sport = UserMapper.mapSport(sportDatabase);

    try {
      await esClient.update({
        index: this.writeIndex,
        id: userId.toString(),
        body: {
          script: {
            source: `
                if (ctx._source.sport === null) {
                  ctx._source.sport = [params.sport];
    
                } else {
                  ctx._source.sport.removeIf((item) -> item.id == params.sport.id);
                  ctx._source.sport.add(params.sport)
                }`,
            params: {
              sport
            }
          }
        }
      });
      return true;
    } catch (error) {
      Logger.error('error', error);
      return false;
    }
  };

  /**
   * Updates a single new sport entry for a User in Elastic Search
   *
   * @param userId
   * @param sportDatabase
   * @returns Promise<boolean>
   */
  updateSport = async (
    userId: string,
    sportDatabase: ISportWithSportRef
  ): Promise<boolean> => {
    const sport = UserMapper.mapSport(sportDatabase);

    try {
      await esClient.update({
        index: this.writeIndex,
        id: userId.toString(),
        body: {
          script: {
            source: `
                 ctx._source.sport.removeIf((item) -> item.id == params.sport.id);
                 ctx._source.sport.add(params.sport);
                  `,
            params: {
              sport
            }
          }
        }
      });
      return true;
    } catch (error) {
      Logger.error('error', error);
      return false;
    }
  };

  /**
   * Deletes a single new sport entry for a User in Elastic Search
   *
   * @param userId
   * @param sportId
   * @returns Promise<boolean>
   */
  deleteSport = async (userId: string, sportId: number): Promise<boolean> => {
    try {
      await esClient.update({
        index: this.writeIndex,
        id: userId.toString(),
        body: {
          script: {
            source:
              'ctx._source.sport.removeIf((item) -> item.id == params.sportId)',
            params: {
              sportId
            }
          }
        }
      });
      return true;
    } catch (error) {
      Logger.error('error', error);
      return false;
    }
  };

  /**
   * Updates the Location for a User in ElasticSearch
   *
   * @param userId
   * @param location
   * @returns Promise<boolean>
   */
  updateLocation = async (
    userId: string,
    location: Location
  ): Promise<boolean> => {
    const mappedLocation = UserMapper.mapLocation(location);

    try {
      await esClient.update({
        index: this.writeIndex,
        id: userId.toString(),
        body: {
          doc: {
            location: mappedLocation
          }
        }
      });
      return true;
    } catch (error) {
      Logger.error('error', error);
      return false;
    }
  };

  /**
   * Creates a Tag for a User in ElasticSearch
   *
   * @param userId
   * @param tag
   * @returns Promise<boolean>
   */
  createTag = async (userId: string, tag: ITagWithTagRef): Promise<boolean> => {
    const mappedTag = UserMapper.mapTag(tag);

    try {
      await esClient.update({
        index: this.writeIndex,
        id: userId.toString(),
        body: {
          script: {
            source: `
                  if (ctx._source.tag === null) {
                    ctx._source.tag = [params.mappedTag];
      
                  } else {
                    ctx._source.tag.removeIf((item) -> item.id == params.mappedTag.id);
                    ctx._source.tag.add(params.mappedTag)
                  }`,
            params: {
              mappedTag
            }
          }
        }
      });
      return true;
    } catch (error) {
      Logger.error('error', error);
      return false;
    }
  };

  /**
   * Deletes a Tag for a User in ElasticSearch
   *
   * @param userId
   * @param tagId
   * @returns Promise<boolean>
   */
  deleteTag = async (userId: string, tagId: number): Promise<boolean> => {
    try {
      await esClient.update({
        index: this.writeIndex,
        id: userId.toString(),
        body: {
          script: {
            source:
              'ctx._source.tag.removeIf((item) -> item.id == params.tagId)',
            params: {
              tagId
            }
          }
        }
      });
      return true;
    } catch (error) {
      Logger.error('error', error);
      return false;
    }
  };

  /**
   * Creates a Vita for a User in ElasticSearch
   *
   * @param userId
   * @param vita
   * @returns Promise<boolean>
   */
  createVita = async (userId: string, vita: Vita): Promise<boolean> => {
    const mappedVita = UserMapper.mapVita(vita);

    try {
      await esClient.update({
        index: this.writeIndex,
        id: userId.toString(),
        body: {
          script: {
            source: `
                if (ctx._source.vita === null) {
                  ctx._source.vita = [params.vita];
    
                } else {
                  ctx._source.vita.removeIf((item) -> item.id == params.vita.id);
                  ctx._source.vita.add(params.vita)
                }`,
            params: {
              vita: mappedVita
            }
          }
        }
      });
      return true;
    } catch (error) {
      Logger.error('error', error);
      return false;
    }
  };

  /**
   * Updates a Vita for a User in ElasticSearch
   *
   * @param userId
   * @param vita
   * @returns Promise<boolean>
   */
  updateVita = async (userId: string, vita: Vita): Promise<boolean> => {
    const mappedVita = UserMapper.mapVita(vita);

    try {
      await esClient.update({
        index: this.writeIndex,
        id: userId.toString(),
        body: {
          script: {
            source: `
                 ctx._source.vita.removeIf((item) -> item.id == params.vita.id);
                 ctx._source.vita.add(params.vita);
                  `,
            params: {
              vita: mappedVita
            }
          }
        }
      });
      return true;
    } catch (error) {
      Logger.error('error', error);
      return false;
    }
  };

  /**
   * Deletes a Vita for User in ElasticSearch
   *
   * @param userId
   * @param vitaId
   * @returns Promise<boolean>
   */
  deleteVita = async (userId: string, vitaId: number): Promise<boolean> => {
    try {
      await esClient.update({
        index: this.writeIndex,
        id: userId.toString(),
        body: {
          script: {
            source:
              'ctx._source.vita.removeIf((item) -> item.id == params.vitaId)',
            params: {
              vitaId
            }
          }
        }
      });
      return true;
    } catch (error) {
      Logger.error('error', error);
      return false;
    }
  };

  /**
   * Updates Review Meta for User in ElasticSearch
   *
   * @param userId
   * @param reviewMeta
   * @returns Promise<boolean>
   */
  updateReviewMeta = async (
    userId: string,
    reviewMeta: ReviewMeta
  ): Promise<boolean> => {
    const mappedReviewMeta = UserMapper.mapReviewMeta(reviewMeta);

    try {
      await esClient.update({
        index: this.writeIndex,
        id: userId.toString(),
        body: {
          doc: {
            reviewMeta: mappedReviewMeta
          }
        }
      });
      return true;
    } catch (error) {
      Logger.error('error', error);
      return false;
    }
  };
}
