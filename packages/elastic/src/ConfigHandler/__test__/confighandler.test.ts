import { ConfigHandler } from '..';

describe('ConfigHandler Unit Test', () => {
  it('should handle valid index names', () => {
    const indexTypes = ConfigHandler.getIndexTypes();

    indexTypes.map((indexType) => {
      const isValid = ConfigHandler.isValidIndexType(indexType);
      return expect(isValid).toBe(true);
    });
  });

  it('should handle invalid index types', async () => {
    const inValidIndexType = 'JohnDoesIndex';
    const isValid = ConfigHandler.isValidIndexType(inValidIndexType);
    expect(isValid).toBe(false);
  });

  it('should return valid read index', () => {
    const indexTypes = ConfigHandler.getIndexTypes();

    indexTypes.map((indexType) => {
      const readIndex = ConfigHandler.getReadAlias(indexType);
      return expect(readIndex).toBe(`${indexType}_read`);
    });
  });
  it('should return valid write index', () => {
    const indexTypes = ConfigHandler.getIndexTypes();

    indexTypes.map((indexType) => {
      const readIndex = ConfigHandler.getWriteAlias(indexType);
      return expect(readIndex).toBe(`${indexType}_write`);
    });
  });
});
