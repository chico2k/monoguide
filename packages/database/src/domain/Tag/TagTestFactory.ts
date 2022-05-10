import { datatype, date } from 'faker';
import type { ITagWithTagRef } from '.';
import { TagRefTestFactory } from '../TagRef';
/**
 * Generates Tag Test Data
 */
class TagTestFactory {
  private tags: ITagWithTagRef[] = [];

  constructor() {
    this.tags = this.tagTestDataCreation();
  }

  /**
   * Get a list of Database Tags
   *
   * @returns a list of Database Tags
   */
  getTags = (): ITagWithTagRef[] => this.tags;

  /**
   * Generate more Datbase Tag Test data
   */
  createMoreTags = (): void => {
    const moreTags = this.tagTestDataCreation();

    this.tags = [...this.tags, ...moreTags];
  };

  private tagTestDataCreation = (): ITagWithTagRef[] => {
    const tags: ITagWithTagRef[] = [];
    const maxTags = 3;

    const tagRefTestFactory = new TagRefTestFactory();
    const tagRefs = tagRefTestFactory.getTagRefTestData();

    const tagRefLength = tagRefs.length;

    const userId = datatype.uuid();

    for (let i = 0; i < maxTags; i += 1) {
      const randomTagRefIndex = datatype.number(tagRefLength - 1);
      const creationDate = date.past();

      const tag: ITagWithTagRef = {
        id: datatype.number(999),
        userId,
        tagRefId: randomTagRefIndex,
        tagRef: tagRefs[randomTagRefIndex],
        createdAt: creationDate,
        updatedAt: creationDate
      };
      tags.push(tag);
    }
    return tags;
  };
}

export { TagTestFactory };
