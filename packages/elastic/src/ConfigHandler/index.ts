class ConfigHandler {
  private indexTypes = ['user', 'review', 'image'];

  static getIndexTypes = () => {
    const configHandler = new ConfigHandler();
    return configHandler.indexTypes;
  };

  static getWriteAlias = (indexType: string) => {
    const isValidIndexType = ConfigHandler.isValidIndexType(indexType);

    if (!isValidIndexType) {
      const configuredIndexTypes = ConfigHandler.getIndexTypes();
      throw new Error(
        `The index ${indexType} is not valid. Valid options are ${configuredIndexTypes.join(
          ' '
        )}`
      );
    }

    return `${indexType}_write`;
  };

  static getReadAlias = (indexType: string) => {
    const isValidIndexType = ConfigHandler.isValidIndexType(indexType);

    if (!isValidIndexType) {
      const configuredIndexTypes = ConfigHandler.getIndexTypes();
      throw new Error(
        `The index ${indexType} is not valid. Valid options are ${configuredIndexTypes.join(
          ' '
        )}`
      );
    }
    return `${indexType}_read`;
  };

  static isValidIndexType = (indexType: string): boolean => {
    const configuredIndexTypes = ConfigHandler.getIndexTypes();

    try {
      if (configuredIndexTypes.includes(indexType)) return true;

      return false;
    } catch (error) {
      return false;
    }
  };
}

export { ConfigHandler };
