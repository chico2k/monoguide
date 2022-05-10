import { Logger } from '@sportsguide/lib';
import esClient from '../client';
import type { IAlias, IAliasKeys } from './types';
import { ConfigHandler } from '../ConfigHandler';

class AliasHandler {
  alias: IAlias = {
    user: [],
    review: [],
    image: []
  };

  private getIndexTypeByIndexName = (indexName: string) =>
    indexName.split('-')[0] as IAliasKeys;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private getAliasFromCluster = async (): Promise<any> => {
    const { body } = await esClient.indices.getAlias();
    return body;
  };

  private getIndexWithAlias = async () => {
    const body = await this.getAliasFromCluster();

    const indexNames = Object.keys(body);

    indexNames.map((indexName) => {
      const aliasNames = Object.keys(body[indexName].aliases);

      aliasNames.map(() => {
        const indexType = this.getIndexTypeByIndexName(indexName);
        const isValidIndexType = ConfigHandler.isValidIndexType(indexType);

        if (!isValidIndexType) return;

        this.alias[indexType as IAliasKeys].push(indexName);
        return this.alias;
      });
      return this.alias;
    });
  };

  getIndexWihtoutAlias = async (): Promise<string[]> => {
    const body = await this.getAliasFromCluster();

    const unsusedIndex: string[] = [];

    const indexNames = Object.keys(body);

    indexNames.map((indexName) => {
      const hasAlias = Object.keys(body[indexName].aliases).length !== 0;

      if (hasAlias) return;
      unsusedIndex.push(indexName);
      return indexName;
    });

    return unsusedIndex;
  };

  getAlias = async () => {
    this.getIndexWihtoutAlias();

    return this.alias;
  };

  private removeAliasInCluster = async (
    indexType: string,
    indexNames: string[]
  ) => {
    try {
      const readAlias = ConfigHandler.getReadAlias(indexType);
      const writeAlias = ConfigHandler.getWriteAlias(indexType);

      const readAndWriteAlias = [readAlias, writeAlias];

      await esClient.indices.deleteAlias({
        index: indexNames,
        name: readAndWriteAlias
      });
    } catch (error) {
      Logger.error('error', error);
    }
  };

  removeAlias = async (indexType: IAliasKeys): Promise<boolean> => {
    try {
      await this.getAliasFromCluster();

      if (this.alias[indexType].length < 1) return true;
      await this.removeAliasInCluster(indexType, this.alias[indexType]);

      return true;
    } catch (error) {
      Logger.error('error', error);
      return false;
    }
  };

  addAlias = async (
    indexType: IAliasKeys,
    indexName: string
  ): Promise<boolean> => {
    try {
      const readAlias = ConfigHandler.getReadAlias(indexType);
      const writeAlias = ConfigHandler.getWriteAlias(indexType);

      const readAndWriteAlias = [readAlias, writeAlias];

      await Promise.all(
        readAndWriteAlias.map(async (alias) => {
          await esClient.indices.putAlias({ index: indexName, name: alias });
        })
      );

      return true;
    } catch (error) {
      Logger.error('error', error);
      return false;
    }
  };
}

export { AliasHandler };
