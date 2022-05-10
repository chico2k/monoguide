import { TagRefTestDatabase } from '..';

describe('Tagref Unit Test', () => {
  const testDb = new TagRefTestDatabase();

  it('should create a new tag', async () => {
    const text = 'A new Tag Text';
    await testDb.createTag({ text });

    const tagRefs = testDb.getTagRef();
    expect(tagRefs.length).toBe(1);
  });

  it('should get the tag list', async () => {
    const list = await testDb.getTagList();
    expect(list.length).toBe(1);
  });

  it('should get the tag list wiht two tags', async () => {
    const text = 'A second Tag Text';
    await testDb.createTag({ text });

    const list = await testDb.getTagList();
    expect(list.length).toBe(2);
  });
});
