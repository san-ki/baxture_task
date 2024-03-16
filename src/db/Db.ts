import { User, dbStorage } from './db_types';
import { UUID, randomUUID } from 'crypto';
import {
  SUCCESS,
  FAIL,
  USER_ALREADY_EXIST,
  USER_NOT_FOUND,
} from '../utils/constants';
import Logger from './logger';

class db {
  users: dbStorage;
  logger: Logger;

  constructor() {
    this.users = {};
    this.logger = new Logger('DB');
  }

  getAll = (): User[] => {
    return Object.values(this.users);
  };

  create = (user: User): string => {
    this.logger.log(user);
    try {
      for (var u in this.users) {
        let curUser = this.users[u];
        if (curUser.username == user.username && curUser.age == user.age)
          throw new Error(USER_ALREADY_EXIST);
      }
      if (!user.id) user.id = randomUUID();
      this.users[user.id] = user;
      this.logger.log('users', this.users);
    } catch (error) {
      this.logger.error('create', error);
      if ([USER_ALREADY_EXIST].includes(error.message)) return error.message;
      return FAIL;
    }
    return SUCCESS;
  };

  put = (user: User): string => {
    try {
      if (!this.users[user.id]) throw new Error(USER_NOT_FOUND);

      this.users[user.id] = user;
    } catch (error) {
      this.logger.error('put', error);
      if ([USER_NOT_FOUND].includes(error.message)) return error.message;
      return FAIL;
    }
    return SUCCESS;
  };

  delete = (id: UUID): string => {
    try {
      if (!this.users[id]) throw new Error(USER_NOT_FOUND);

      delete this.users[id];
    } catch (error) {
      this.logger.error('put', error);
      if ([USER_NOT_FOUND].includes(error.message)) return error.message;
      return FAIL;
    }
    return SUCCESS;
  };

  getOne = (id: UUID): User => {
    let user: User = null;
    try {
      if (!this.users[id]) throw new Error(USER_NOT_FOUND);

      return this.users[id];
    } catch (error) {
      this.logger.error('put', error);
      if ([USER_NOT_FOUND].includes(error.message)) return error.message;
      return null;
    }
  };
}

export default db;
