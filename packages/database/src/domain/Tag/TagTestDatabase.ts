import type { TagRef } from '@prisma/client';
import { datatype } from 'faker';
import { produce } from 'immer';
import type { ITagWithTagRef } from '../..';
import { TagRefTestFactory } from '../TagRef';
import type { ICreateTagInput, ITagDatabase } from './types';

class TagTestDatabase implements ITagDatabase {
  tags: ITagWithTagRef[] = [];

  tagRefs: TagRef[] = [];

  constructor() {
    const tagRefFactory = new TagRefTestFactory();
    this.tagRefs = tagRefFactory.getTagRefTestData();
  }

  getTags = () => this.tags;

  createTag = async ({
    userId,
    tagRefId
  }: ICreateTagInput): Promise<ITagWithTagRef> => {
    const tagRefIndex = this.tagRefs.findIndex(
      (tagRef) => tagRef.id === tagRefId
    );
    if (tagRefIndex === -1) throw Error('Tag Ref could not be found');

    const createdAt = new Date();

    const newTag: ITagWithTagRef = {
      id: datatype.number(999),
      userId,
      tagRefId,
      createdAt,
      updatedAt: createdAt,

      tagRef: this.tagRefs[tagRefIndex]
    };

    this.tags = produce(this.tags, (draft) => {
      draft.push(newTag);
    });

    return newTag;
  };

  checkTagExists = async (
    userId: string,
    tagRefId: number
  ): Promise<boolean> => {
    const index = this.tags.findIndex(
      (tag) => tag.tagRefId === tagRefId && tag.userId === userId
    );

    if (index === -1) return false;
    return true;
  };

  getTagDetail = async (tagId: number): Promise<ITagWithTagRef> => {
    const index = this.tags.findIndex((tag) => tag.id === tagId);
    return this.tags[index];
  };

  getTagList = async ({
    userId
  }: {
    userId: string;
  }): Promise<ITagWithTagRef[]> =>
    this.tags.filter((tag) => tag.userId === userId);

  deleteTag = async (tagId: number): Promise<boolean> => {
    const index = this.tags.findIndex((tag) => tag.id === tagId);

    this.tags = produce(this.tags, (draft) => {
      if (index !== -1) draft.splice(index, 1);
    });

    return true;
  };
}

export { TagTestDatabase };
