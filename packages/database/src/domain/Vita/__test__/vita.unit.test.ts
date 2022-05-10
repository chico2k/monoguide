import { Vita } from '@prisma/client';
import { VitaTestDatabase, VitaTestFactory } from '..';

describe('Vita Unit Test', () => {
  const testDb = new VitaTestDatabase();
  const testFactory = new VitaTestFactory();

  let newVita: Vita;
  let updatedVita: Vita;
  let newVita2: Vita;

  it('should create a new vita', async () => {
    const newVitaData = testFactory.getVitaCreateData();
    newVita = await testDb.createVita(newVitaData);

    expect(newVita).toMatchObject(newVitaData);
    expect(testDb.getVita().length).toBe(1);
  });

  it('should update a new vita', async () => {
    const updatedVitaData = {
      ...newVita,
      text: 'New Text',
      isCurrent: false,
      title: 'A new title'
    };

    updatedVita = await testDb.updateVita(updatedVitaData);

    expect(updatedVita).toMatchObject(updatedVitaData);
    expect(testDb.getVita().length).toBe(1);
  });

  it('should get vita detail', async () => {
    const newVitaData = testFactory.getVitaCreateData();

    newVita2 = await testDb.createVita(newVitaData);

    const vitaDetail = await testDb.getVitaDetail(newVita2.id);
    expect(vitaDetail).toMatchObject(newVita2);
    expect(testDb.getVita().length).toBe(2);
  });

  it('should get vita list', async () => {
    const newVitaData3 = testFactory.getVitaCreateData(newVita.userId);
    newVita2 = await testDb.createVita(newVitaData3);

    const vitaList = await testDb.getVitaList(newVita.userId);

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

  it('should delete vita', async () => {
    await testDb.deleteVita(updatedVita.id);

    const vitaList = await testDb.getVitaList(newVita.userId);

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
