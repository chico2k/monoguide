interface ILog {
  error?: Error;
  text?: any;
}
export class Logger {
  private static instance: Logger;
  environment = process.env.NEXT_PUBLIC_ENVIRONMENT;

  debug =
    this.environment === 'development' ||
    this.environment === 'dev' ||
    this.environment === 'local' ||
    process.env.NODE === 'development'
      ? true
      : false;

  private constructor() {}

  private static getInstance = (): Logger => {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }

    return Logger.instance;
  };

  public static setLog = (log: ILog) => {
    const instance = Logger.getInstance();

    if (instance.debug && log.error) console.error(log.error);
    if (instance.debug && log.text) console.error(log.error);
  };
}
