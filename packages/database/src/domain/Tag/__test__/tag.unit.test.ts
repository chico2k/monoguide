import type { User } from '@prisma/client';
import { UserTestDatabase, UserTestFactory } from '../../User';
import { TagTestDatabase } from '..';
import type { ITagWithTagRef } from '..';

describe('Tag Unit Test', () => {
  const testDB = new TagTestDatabase();

  let user: User;

  let newTag: ITagWithTagRef;

  beforeAll(async () => {
    const userTestFactory = new UserTestFactory();

    const userCreateData = userTestFactory.getUserCreateData();
    const userDatabase = new UserTestDatabase();
    user = await userDatabase.createUser(userCreateData);
  });

  it('should create a new Tag', async () => {
    const tagRef = testDB.tagRefs[0];
    const tagRefId = tagRef.id;

    newTag = await testDB.createTag({
      userId: user.id,
      tagRefId
    });
    expect(newTag.tagRef).toStrictEqual(tagRef);
    expect(newTag.userId).toBe(user.id);
    const tagListLength = testDB.getTags().length;
    expect(tagListLength).toBe(1);
  });

  it('should check if tag exists for user', async () => {
    const tagRef1 = testDB.tagRefs[0];
    const tagExists1 = await testDB.checkTagExists(user.id, tagRef1.id);

    const tagRef2 = testDB.tagRefs[1];
    const tagExists2 = await testDB.checkTagExists(user.id, tagRef2.id);

    expect(tagExists1).toBe(true);
    expect(tagExists2).toBe(false);
  });

  it('should return the tag detail', async () => {
    const tagDetail = await testDB.getTagDetail(newTag.id);

    expect(tagDetail).toStrictEqual(newTag);
  });

  it('should return the tag list for a user', async () => {
    const tagRef = testDB.tagRefs[2];
    const tagRefId = tagRef.id;

    newTag = await testDB.createTag({
      userId: user.id,
      tagRefId
    });

    const list = await testDB.getTagList({ userId: user.id });
    expect(list.length).toBe(2);
  });

  it('should delete a tag', async () => {
    await testDB.deleteTag(newTag.id);

    const list = await testDB.getTagList({ userId: user.id });

    expect(list.length).toBe(1);
  });
});
