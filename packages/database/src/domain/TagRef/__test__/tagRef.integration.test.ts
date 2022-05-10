import { TagRef } from '@prisma/client';
import { TagRefTestDatabase } from '..';

describe('TagRef Integration Test', () => {
  const testDB = new TagRefTestDatabase();
  let tagRef: TagRef;
  let tagRef2: TagRef;

  it('should create a Tag Ref', async () => {
    const input = { text: 'A new Tag text' };
    tagRef = await testDB.createTag(input);

    expect(tagRef).toEqual(expect.objectContaining(input));
  });

  it('should get the Tag Ref List', async () => {
    const input = { text: 'A second Tag text' };
    tagRef2 = await testDB.createTag(input);

    const list = await testDB.getTagList();

    expect(list.length).toBe(2);

    expect(list).toEqual(
      expect.arrayContaining([
        expect.not.objectContaining({
          ...tagRef2
        }),
        expect.objectContaining({
          ...tagRef
        })
      ])
    );
  });

  it('should get the tag list', async () => {
    const list = await testDB.getTagList();

    expect(list.length).toBe(2);
  });
});
