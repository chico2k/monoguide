const ERROR_MESSAGE = {
  AliasExistsException: `An account with the given email already exists.`,
};

export class ErrorMessage {
  static getErrorMessage = (errorCode: string): string => {
    try {
      return ERROR_MESSAGE[errorCode];
    } catch (error) {
      console.log('error', error);
      return undefined;
    }
  };
}
