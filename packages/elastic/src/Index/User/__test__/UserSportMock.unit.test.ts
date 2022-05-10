import {
  SportTestFactory,
  ISportWithSportRef,
  UserTestFactory
} from '@sportsguide/database';
import { UserElasticMock } from '../__mock__';
import {} from '@prisma/client';

describe('User Sport Mock Unit Test', () => {
  let elasticMock: UserElasticMock;
  let sportDB: ISportWithSportRef;
  const userFactory = new UserTestFactory();
  const [user] = userFactory.getUserTestData();
  const { id: userId } = user;

  it('should create the User Elastic Mock', async () => {
    elasticMock = new UserElasticMock();

    expect(!!elasticMock).toBe(true);
  });

  it('should create a sport', async () => {
    const factory = new SportTestFactory();
    [sportDB] = factory.getSportTestData();

    await elasticMock.createUser(user);

    const response = await elasticMock.createSport(userId, sportDB);

    const detail = elasticMock.getUserDetailelper(userId);

    expect(response).toBe(true);
    expect(detail.sport).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: sportDB.id,
          level: sportDB.level,
          sportRef: {
            id: sportDB.sportRef.id,
            title: sportDB.sportRef.title
          }
        })
      ])
    );
  });

  it('should update sport', async () => {
    const updatedLevel = 1;
    const udpatedSport = {
      ...sportDB,
      level: updatedLevel
    };
    const response = await elasticMock.updateSport(userId, udpatedSport);

    const result = elasticMock.getUserDetailelper(userId);

    expect(response).toBe(true);
    expect(result.sport).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: sportDB.id,
          level: updatedLevel,
          sportRef: {
            id: sportDB.sportRef.id,
            title: sportDB.sportRef.title
          }
        })
      ])
    );
  });

  it('should delete a sport', async () => {
    const response = await elasticMock.deleteSport(userId, sportDB.id);
    const detail = elasticMock.getUserDetailelper(userId);

    expect(response).toBe(true);
    expect(detail.sport).toEqual(
      expect.not.arrayContaining([
        expect.objectContaining({
          id: sportDB.id
        })
      ])
    );
  });
});
