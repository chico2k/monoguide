import type { TagRef } from '@prisma/client';
import { datatype } from 'faker';
import { tagRefs } from '../../../prisma/data/tagRefs';

/**
 * Generates TagRef Test data
 */
class TagRefTestFactory {
  private tagRefs: TagRef[] = [];

  /**
   * Get a List of Database TagRefs
   *
   * @returns a list of Database TagRefs
   */
  getTagRefTestData = () => this.tagRefs;

  constructor() {
    this.tagRefs = this.tagRefTestDataCreation();
  }

  private tagRefTestDataCreation = () =>
    tagRefs.map((tag) => {
      const creationDate = new Date();
      return {
        ...tag,
        createdAt: creationDate,
        updatedAt: creationDate
      };
    });

  /**
   * Map a Text to a full Database TagRef
   *
   * @param text
   * @returns Database TagRef
   */
  mapTagRefInput = (text: string): TagRef => {
    const creationDate = new Date();

    return {
      id: datatype.number(9999),
      text,
      createdAt: creationDate,
      updatedAt: creationDate
    };
  };
}

export { TagRefTestFactory };
