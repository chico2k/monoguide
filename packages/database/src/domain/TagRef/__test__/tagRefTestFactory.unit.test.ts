import { TagRefTestFactory } from '..';

describe('TagRef Test Factory Unit Test', () => {
  const tagRefTestFactory = new TagRefTestFactory();
  it('should get the TagRef test data', async () => {
    const tagRefs = tagRefTestFactory.getTagRefTestData();

    expect(!!tagRefs).toBe(true);
  });

  it('should map a text to a TagRef database', async () => {
    const text = 'Older';

    const tagRefDB = tagRefTestFactory.mapTagRefInput(text);

    expect(tagRefDB.text).toBe(text);
  });
});
