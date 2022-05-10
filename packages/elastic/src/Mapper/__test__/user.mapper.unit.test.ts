import {
  LocationTestFactory,
  ReviewMetaTestFactory,
  SportTestFactory,
  TagTestFactory,
  UserTestFactory,
  VitaTestFactory
} from '@sportsguide/database';
import { UserMapper } from '../user';

describe('User Mapper Unit Test', () => {
  it('should map a User', () => {
    const userFactory = new UserTestFactory();
    const userList = userFactory.getUserTestData();

    userList.map((user) => {
      const mapped = UserMapper.mapUser(user);

      return expect(user).toEqual(expect.objectContaining(mapped));
    });
  });

  it('should map a sport', async () => {
    const sportFactory = new SportTestFactory();
    const sportist = sportFactory.getSportTestData();

    sportist.map((sport) => {
      const mapped = UserMapper.mapSport(sport);

      return expect(sport).toEqual(
        expect.objectContaining({
          ...mapped,
          sportRef: expect.objectContaining(mapped.sportRef)
        })
      );
    });
  });

  it('should map a location', () => {
    const locationFactory = new LocationTestFactory();
    const locationList = locationFactory.gestLocationTestData();

    locationList.map((location) => {
      const mapped = UserMapper.mapLocation(location);

      return expect(location).toEqual(
        expect.objectContaining({
          ...mapped
        })
      );
    });
  });

  it('should map a tag', () => {
    const tagFactory = new TagTestFactory();
    const tagList = tagFactory.getTags();

    tagList.map((tag) => {
      const mapped = UserMapper.mapTag(tag);
      return expect(tag).toEqual(
        expect.objectContaining({
          ...tag,
          tagRef: expect.objectContaining(mapped.tagRef)
        })
      );
    });
  });

  it('should map the review Meta', async () => {
    const reviewMetaFactory = new ReviewMetaTestFactory();
    const reviewMetaList = reviewMetaFactory.getReviewMetaTestdata();

    reviewMetaList.map((reviewMeta) => {
      const mapped = UserMapper.mapReviewMeta(reviewMeta);

      return expect(reviewMeta).toEqual(
        expect.objectContaining({
          ...mapped
        })
      );
    });
  });

  it('should map a vita', () => {
    const vitaFactory = new VitaTestFactory();
    const vitaList = vitaFactory.getvitaTestData();

    vitaList.map((vita) => {
      const mapped = UserMapper.mapVita(vita);

      return expect(vita).toEqual(
        expect.objectContaining({
          ...mapped
        })
      );
    });
  });
});
