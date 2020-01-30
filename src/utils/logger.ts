export class Logger {
  protected static logger: Logger;

  static getInstance(): Logger {
    if (Logger.logger) {
      return Logger.logger;
    } else {
      Logger.logger = new Logger();
    }
  }

  constructor() {}

  info(msg: string) {
    console.log(this.addTimestamp(msg));
  }

  warn(msg: string) {
    console.warn(this.addTimestamp(msg));
  }

  error(msg: string) {
    console.error(this.addTimestamp(msg));
  }

  protected addTimestamp(msg: string): string {
    return new Date().toLocaleTimeString() + `:${msg}. (winplug)`;
  }
}
