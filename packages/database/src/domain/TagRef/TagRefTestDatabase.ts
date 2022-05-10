import type { TagRef } from '@prisma/client';
import { produce } from 'immer';
import type { ITagRefDatabase } from './types';
import { TagRefTestFactory } from './TagRefTestFactory';

class TagRefTestDatabase implements ITagRefDatabase {
  tagRefs: TagRef[] = [];

  getTagRef = () => this.tagRefs;

  createTag = async ({ text }: { text: string }): Promise<TagRef> => {
    const testFactory = new TagRefTestFactory();
    const newTagRef = testFactory.mapTagRefInput(text);

    this.tagRefs = produce(this.tagRefs, (draft) => {
      draft.push(newTagRef);
    });
    return newTagRef;
  };

  getTagList = async (): Promise<TagRef[]> => this.tagRefs;
}

export { TagRefTestDatabase };
