import type { User } from '@prisma/client';
import { UserTestFactory, UserDatabase } from '../../User';
import { TagDatabase } from '../TagDatabase';
import type { ITagWithTagRef } from '../types';
import { TagRefTestFactory } from '../../TagRef/TagRefTestFactory';

describe('Tag Integration Test', () => {
  const testDB = new TagDatabase();
  const tagFactory = new TagRefTestFactory();

  let user: User;
  let user2: User;

  let newTagUser1: ITagWithTagRef;
  let newTagUser2: ITagWithTagRef;

  beforeAll(async () => {
    const userTestFactory = new UserTestFactory();

    const userCreateData = userTestFactory.getUserCreateData();
    const userCreateData2 = userTestFactory.getUserCreateData();

    const userDatabase = new UserDatabase();

    user = await userDatabase.createUser(userCreateData);
    user2 = await userDatabase.createUser(userCreateData2);
  });

  it('should create a new tag', async () => {
    const tagRef = tagFactory.getTagRefTestData()[0];

    const tagRefId = tagRef.id;

    newTagUser1 = await testDB.createTag({ userId: user.id, tagRefId });

    expect(!!newTagUser1).toBe(true);

    expect(newTagUser1.userId).toBe(user.id);
    expect(newTagUser1.tagRef).toEqual(
      expect.objectContaining({ id: tagRefId })
    );
  });

  it('should create a new tag for a second user', async () => {
    const tagRef = tagFactory.getTagRefTestData()[1];
    const tagRefId = tagRef.id;

    newTagUser2 = await testDB.createTag({
      userId: user2.id,
      tagRefId
    });

    expect(!!newTagUser2).toBe(true);
    expect(newTagUser2.userId).toBe(user2.id);
    expect(newTagUser2.tagRef).toEqual(
      expect.objectContaining({ id: tagRefId })
    );
  });

  it('should get the tag details', async () => {
    const tagDetail = await testDB.getTagDetail(newTagUser1.id);

    expect(tagDetail).toStrictEqual(newTagUser1);
  });

  it('should get the tag list for a single user', async () => {
    const tagRef = tagFactory.getTagRefTestData()[3];
    const tagRefId = tagRef.id;

    const newTagUser3 = await testDB.createTag({
      userId: user.id,
      tagRefId
    });

    const tagList = await testDB.getTagList({ userId: user.id });
    const legnth = tagList.length;

    expect(legnth).toBe(2);

    expect(tagList).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ...newTagUser1
        }),
        expect.objectContaining({
          ...newTagUser3
        }),
        expect.not.objectContaining({
          ...newTagUser2
        })
      ])
    );
  });

  it('should delete a tag for a user', async () => {
    await testDB.deleteTag(newTagUser1.id);
    const tagList = await testDB.getTagList({ userId: user.id });
    const legnth = tagList.length;

    expect(legnth).toBe(1);

    expect(tagList).toEqual(
      expect.arrayContaining([
        expect.not.objectContaining({
          ...newTagUser1
        })
      ])
    );
  });
});
