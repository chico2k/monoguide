import type { IndicesPutTemplate } from '@elastic/elasticsearch/api/requestParams';
import { Logger } from '@sportsguide/lib';
import type { IndexDefinition } from '../types/index';
import * as indexDefinition from '../IndexDefinition';
import esClient from '../client';

export class IndexTemplateHandler {
  indexDefinitions: IndexDefinition[];

  constructor() {
    this.indexDefinitions = [
      indexDefinition.ImageIndexDefinition,
      indexDefinition.ReviewIndexDefinition,
      indexDefinition.UserIndexDefinition
    ];
  }

  putAllIndexTemplate = async (): Promise<boolean> => {
    try {
      await Promise.all(
        this.indexDefinitions.map(async (index) => this.putIndexTemplate(index))
      );

      return true;
    } catch (error) {
      Logger.error('error', error);
      return false;
    }
  };

  putIndexTemplate = async (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mapping: IndicesPutTemplate<Record<string, any>>
  ): Promise<boolean> => {
    try {
      await esClient.indices.putIndexTemplate(mapping);
      return true;
    } catch (error) {
      Logger.error('error', error);
      return false;
    }
  };
}
