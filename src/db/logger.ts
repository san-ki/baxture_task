import moment = require('moment');

interface Logger {
  log(...args: any[]): void;
  error(...args: any[]): void;
}

class LoggerClass implements Logger {
  type: string;

  constructor(type: string) {
    this.type = type;
  }

  log(...args: any[]): void {
    console.log(
      `[${moment().format('YYYY-MM-DD')}] [INFO] [${this.type}]`,
      args,
    );
  }

  error(...args: any[]): void {
    console.error(
      `[${moment().format('YYYY-MM-DD')}] [ERROR] [${this.type}]`,
      args,
    );
  }
}

export default LoggerClass;
