const moment = require('moment');

class Logger {
  constructor(type) {
    this.type = type;
  }
  log = (...args) => {
    console.log(
      `[${moment().format('YYYY-MM-DD')}] [INFO] [${this.type}]`,
      args,
    );
  };
  error = (...args) => {
    console.error(
      `[${moment().format('YYYY-MM-DD')}] [ERROR] [${this.type}]`,
      args,
    );
  };
}

// exports.default = Logger;
module.exports = Logger;
