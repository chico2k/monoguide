import { User, Vita } from '@prisma/client';
import { VitaTestFactory, VitaDatabase } from '..';
import { UserDatabase, UserTestFactory } from '../../User';

describe('Vita Integration Test', () => {
  const testDb = new VitaDatabase();
  const testFactory = new VitaTestFactory();

  let user: User;
  let newVita: Vita;
  let updatedVita: Vita;
  let newVita2: Vita;

  let newVitaData: {
    userId: string;
    title: string;
    text: string;
    fromDate: Date;
    toDate: Date;
    isCurrent: boolean;
  };

  beforeAll(async () => {
    const userTestFactory = new UserTestFactory();

    const userCreateData = userTestFactory.getUserCreateData();
    const userDatabase = new UserDatabase();
    user = await userDatabase.createUser(userCreateData);
  });

  it('should create a new vita', async () => {
    newVitaData = testFactory.getVitaCreateData(user.id);

    newVita = await testDb.createVita(newVitaData);

    expect(newVita).toMatchObject(newVitaData);
  });

  it('should update a vita', async () => {
    const updateVitaData = {
      ...newVitaData,
      id: newVita.id,
      title: 'A new Vita Title'
    };

    updatedVita = await testDb.updateVita(updateVitaData);

    const vitaList = await testDb.getVitaList(user.id);

    expect(vitaList.length).toBe(1);

    expect(updateVitaData.title).toBe(updatedVita.title);
    expect(updateVitaData.text).toBe(newVita.text);
  });

  it('should get the updated vita detail', async () => {
    const vitaDetail = await testDb.getVitaDetail(updatedVita.id);

    expect(updatedVita).toStrictEqual(vitaDetail);
  });

  it('should get the vita list', async () => {
    const vitaData2 = testFactory.getVitaCreateData(user.id);
    const newVita2 = await testDb.createVita(vitaData2);

    const vitaList = await testDb.getVitaList(user.id);
    expect(vitaList.length).toBe(2);

    expect(vitaList).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ...updatedVita
        }),
        expect.objectContaining({
          ...newVita2
        })
      ])
    );
  });

  it('should delete the vita', async () => {
    await testDb.deleteVita(updatedVita.id);

    const vitaList = await testDb.getVitaList(user.id);

    expect(vitaList.length).toBe(1);

    expect(vitaList).toEqual(
      expect.arrayContaining([
        expect.not.objectContaining({
          ...updatedVita
        }),
        expect.objectContaining({
          ...newVita2
        })
      ])
    );
  });
});
