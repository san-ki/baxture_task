const crypto_1 = require('crypto');
const constants_1 = require('./constants');
const Logger = require('./logger');

class db {
  constructor() {
    this.users = {};
    this.logger = new Logger('DB');
    this.isFree = true;
  }
  toggleFree = () => {
    this.isFree = !this.isFree;
  };
  getAll = () => {
    return Object.values(this.users);
  };
  create = (user) => {
    // this.logger.log(user);
    try {
      for (var u in this.users) {
        let curUser = this.users[u];
        if (curUser.username == user.username && curUser.age == user.age)
          throw new Error(constants_1.USER_ALREADY_EXIST);
      }
      if (!user.id) user.id = (0, crypto_1.randomUUID)();
      this.users[user.id] = user;
      this.logger.log('users', this.users);
    } catch (error) {
      this.logger.error('create', error);
      if ([constants_1.USER_ALREADY_EXIST].includes(error.message))
        return error.message;
      return constants_1.FAIL;
    }
    return constants_1.SUCCESS;
  };
  put = (user) => {
    console.log(this.users, user);
    try {
      if (!this.users[user.id]) throw new Error(constants_1.USER_NOT_FOUND);
      this.users[user.id] = user;
    } catch (error) {
      this.logger.error('put', error);
      if ([constants_1.USER_NOT_FOUND].includes(error.message))
        return error.message;
      return constants_1.FAIL;
    }
    return constants_1.SUCCESS;
  };
  delete = (id) => {
    try {
      if (!this.users[id]) throw new Error(constants_1.USER_NOT_FOUND);
      delete this.users[id];
    } catch (error) {
      // this.logger.error('put', error);
      if ([constants_1.USER_NOT_FOUND].includes(error.message))
        return error.message;
      return constants_1.FAIL;
    }
    return constants_1.SUCCESS;
  };
  getOne = (id) => {
    let user = null;
    try {
      if (!this.users[id]) throw new Error(constants_1.USER_NOT_FOUND);
      return this.users[id];
    } catch (error) {
      // this.logger.error('put', error);
      if ([constants_1.USER_NOT_FOUND].includes(error.message))
        return error.message;
      return null;
    }
  };
}

let dbInstance = new db();
module.exports = dbInstance;
