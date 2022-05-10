import { SportTestDatabase } from '@sportsguide/database';
import { AuthTestFactory } from '@sportsguide/auth';
import { datatype } from 'faker';
import { SportService } from '../service';
import type { SportInput } from '../types';

describe('Sport Unit Test', () => {
  const userId = datatype.uuid();
  const ctx = AuthTestFactory.getTestContext({ userId, authenticated: true });

  it('should create a sport', async () => {
    const sportTestRepo = new SportTestDatabase();

    const sportService = new SportService(sportTestRepo);

    const data: SportInput = {
      level: 1,
      sportRefId: 1
    };

    const response = await sportService.createSportService(data, ctx);

    expect(response.type).toBe('SportCreateSuccess');
  });

  it('should fail when sport exists', async () => {
    const sportTestRepo = new SportTestDatabase();

    const sportService = new SportService(sportTestRepo);

    const data: SportInput = {
      level: 1,
      sportRefId: 1
    };

    await sportService.createSportService(data, ctx);

    const response = await sportService.createSportService(data, ctx);

    expect(response.type).toBe('SportAlreadyExist');
  });
});

describe('Sport Detail', () => {
  const userId = datatype.uuid();
  const ctx = AuthTestFactory.getTestContext({ userId, authenticated: true });

  const userId2 = datatype.uuid();
  const ctx2 = AuthTestFactory.getTestContext({
    userId: userId2,
    authenticated: true
  });

  it('should get the detailed sport information', async () => {
    const sportTestRepo = new SportTestDatabase();

    const sportService = new SportService(sportTestRepo);

    const data: SportInput = {
      level: 1,
      sportRefId: 1
    };

    const newSport = await sportService.createSportService(data, ctx);

    if (newSport.type !== 'SportCreateSuccess') return;

    const detailed = await sportService.getSportDetailService(
      newSport.sport.id,
      ctx
    );

    expect(detailed.type).toBe('SportDetailSuccess');
    if (detailed.type !== 'SportDetailSuccess') return;

    expect(detailed.sport.userId).toBe(userId);
  });

  it('should failed when not owner of sport', async () => {
    const sportTestRepo = new SportTestDatabase();

    const sportService = new SportService(sportTestRepo);

    const data: SportInput = {
      level: 1,
      sportRefId: 1
    };

    const newSport = await sportService.createSportService(data, ctx);

    if (newSport.type !== 'SportCreateSuccess') return;

    const detailed = await sportService.getSportDetailService(
      newSport.sport.id,
      ctx2
    );

    expect(detailed.type).toBe('SportNotOwner');
  });
});
