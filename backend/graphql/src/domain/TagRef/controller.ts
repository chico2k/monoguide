import { ValidationError } from 'apollo-server';
import { Service, Container } from 'typedi';
import type { TagRef } from '@prisma/client';
import { TagRefService } from './services';

@Service()
class TagRefController {
  tagRefService = Container.get(TagRefService);

  getTagRefListController = async (): Promise<TagRef[]> => {
    const tagRefOrError = await this.tagRefService.getTagRefListService();

    switch (tagRefOrError.type) {
      case 'GetTagListSuccess':
        return tagRefOrError.data.tagRef;
      case 'GetTagListFail':
        throw new ValidationError('TAGREF_SERVICE_FAILED');
    }
  };

  createTagRefController = async (text: string): Promise<TagRef> => {
    const tagRefOrError = await this.tagRefService.createTagRefService(text);
    switch (tagRefOrError.type) {
      case 'CreateTagSuccess':
        return tagRefOrError.data.tagRef;
      case 'CreateTagFail':
        throw new ValidationError('TAGREF_SERVICE_FAILED');
    }
  };
}

export { TagRefController };
