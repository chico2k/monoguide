import type { ITagWithTagRef } from '..';
import { TagTestFactory } from '../TagTestFactory';

describe('Tag Test Factory', () => {
  const tagTestFactory = new TagTestFactory();
  let tags: ITagWithTagRef[];

  it('should create test data', async () => {
    tags = tagTestFactory.getTags();

    tagTestFactory.createMoreTags();

    expect(!!tags).toBe(true);
  });

  it('should create more test tags', async () => {
    const moreTags = tagTestFactory.getTags();
    expect(tags.length).toBeLessThan(moreTags.length);
  });
});
