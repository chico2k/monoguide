import { Logger } from '@sportsguide/lib';
import { AliasHandler } from '../AliasHandler';
import type { IAliasKeys } from '../AliasHandler/types';
import esClient from '../client';

export class IndexDeploy {
  createIndexAppendix = (): string => (
      `${new Date().toLocaleDateString().replace('/', '-').replace('/', '-') 
      }-${ 
      new Date()
        .toLocaleTimeString('en-US', {
          hour12: false,
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric'
        })
        .replace(':', '-')
        .replace(':', '-')}`
    );

  createIndex = async (indexName: string): Promise<boolean> => {
    try {
      const timestamp = this.createIndexAppendix();

      const aliasKey = indexName as IAliasKeys;

      const newIndexName = `${indexName}-${timestamp}`;

      await esClient.indices.create({ index: newIndexName });

      // Remove all previous alias
      const aliasHandler = new AliasHandler();
      await aliasHandler.removeAlias(aliasKey);

      // Add new allias
      await aliasHandler.addAlias(aliasKey, newIndexName);

      return true;
    } catch (error) {
      Logger.error('error', error);
      return false;
    }
  };

  deleteIndex = async (indexName: string): Promise<boolean> => {
    try {
      await esClient.indices.delete({
        index: indexName
      });
      return true;
    } catch (error) {
      return false;
    }
  };

  deleteIndexBulk = async (indexNames: string[]) => {
    try {
      await Promise.all(
        indexNames.map(async (indexName) => {
          await this.deleteIndex(indexName);
        })
      );

      return true;
    } catch (error) {
      return false;
    }
  };
}
