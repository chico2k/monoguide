import { UserTestFactory, VitaTestFactory } from '@sportsguide/database';
import { UserMapper } from '../../../Mapper/user';
import { UserElasticMock } from '../__mock__';

describe('User Vita Mock Unit Test', () => {
  const elasticMock = new UserElasticMock();

  const vitaFactory = new VitaTestFactory();
  const userFactory = new UserTestFactory();

  const vitaList = vitaFactory.getvitaTestData();

  const vita = vitaList[0];
  const mappedVita = UserMapper.mapVita(vita);

  const secondVita = vitaList[1];
  const mappedSecondVita = UserMapper.mapVita(secondVita);

  const updatedVita = {
    ...secondVita,
    text: 'A new Vita Text'
  };
  const mappedUpdatedVita = UserMapper.mapVita(updatedVita);

  const [user] = userFactory.getUserTestData();
  const { id: userId } = user;

  beforeAll(async () => {
    await elasticMock.createUser(user);
  });

  it('should create new vita', async () => {
    const response = await elasticMock.createVita(userId, vita);

    const detail = elasticMock.getUserDetailelper(userId);

    expect(detail.vita.length).toBe(1);
    expect(response).toBe(true);
    expect(detail.vita).toEqual(
      expect.arrayContaining([expect.objectContaining(mappedVita)])
    );
  });

  it('should create a second vita', async () => {
    const response = await elasticMock.createVita(userId, secondVita);

    const detail = elasticMock.getUserDetailelper(userId);

    expect(detail.vita.length).toBe(2);
    expect(response).toBe(true);
    expect(detail.vita).toEqual(
      expect.arrayContaining([expect.objectContaining(mappedSecondVita)])
    );
  });

  it('should update a vita', async () => {
    const response = await elasticMock.updateVita(userId, updatedVita);

    const detail = elasticMock.getUserDetailelper(userId);

    expect(detail.vita.length).toBe(2);
    expect(response).toBe(true);

    expect(detail.vita).not.toEqual(
      expect.arrayContaining([expect.objectContaining(mappedSecondVita)])
    );
    expect(detail.vita).toEqual(
      expect.arrayContaining([expect.objectContaining(mappedUpdatedVita)])
    );
  });

  it('should delete a vita', async () => {
    const response = await elasticMock.deleteVita(userId, updatedVita.id);

    const detail = elasticMock.getUserDetailelper(userId);

    expect(detail.vita.length).toBe(1);
    expect(response).toBe(true);

    expect(detail.vita).not.toEqual(
      expect.arrayContaining([expect.objectContaining(mappedUpdatedVita)])
    );
    expect(detail.vita).toEqual(
      expect.arrayContaining([expect.objectContaining(mappedVita)])
    );
  });
});
