import { TagTestFactory, UserTestFactory } from '@sportsguide/database';
import { UserElasticMock } from '../__mock__';

describe('User Tag Mock Unit Test', () => {
  const elasticMock = new UserElasticMock();
  const userFactory = new UserTestFactory();
  const tagFactory = new TagTestFactory();
  const tagList = tagFactory.getTags();

  const tag = tagList[0];
  const secondTag = tagList[1];
  const [user] = userFactory.getUserTestData();
  const { id: userId } = user;

  it('should create a new tag', async () => {
    await elasticMock.createUser(user);

    const response = await elasticMock.createTag(userId, tag);

    const detail = elasticMock.getUserDetailelper(userId);

    expect(response).toBe(true);
    expect(detail.tag).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: tag.id,
          tagRef: {
            id: tag.tagRef.id,
            text: tag.tagRef.text
          }
        })
      ])
    );
  });

  it('should create a second tag', async () => {
    const response = await elasticMock.createTag(userId, secondTag);

    const detail = elasticMock.getUserDetailelper(userId);

    expect(response).toBe(true);
    expect(detail.tag.length).toBe(2);

    expect(detail.tag).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: secondTag.id,
          tagRef: {
            id: secondTag.tagRef.id,
            text: secondTag.tagRef.text
          }
        })
      ])
    );
  });

  it('should delete a tag', async () => {
    const response = await elasticMock.deleteTag(userId, tag.id);

    const detail = elasticMock.getUserDetailelper(userId);

    expect(response).toBe(true);
    expect(detail.tag.length).toBe(1);
    expect(detail.tag).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: tag.id,
          tagRef: {
            id: tag.tagRef.id,
            text: tag.tagRef.text
          }
        })
      ])
    );

    expect(detail.tag).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: secondTag.id,
          tagRef: {
            id: secondTag.tagRef.id,
            text: secondTag.tagRef.text
          }
        })
      ])
    );
  });
});
