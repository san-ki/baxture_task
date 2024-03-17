import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import db from '../../db/Db';
import { User } from '../../db/db_types';
import { SUCCESS } from '../../utils/constants';
import { IdTo } from './user.dto';

@Injectable()
export class UserService {
  private DB: db = new db();

  getHello(): string {
    return 'hello from user';
  }

  create(user: User): string {
    let resp = this.DB.create(user);
    return resp;
  }

  put(user: User): string {
    let resp = this.DB.put(user);
    return resp;
  }

  delete(id: UUID): string {
    let resp = this.DB.delete(id);
    return resp;
  }

  getOne(id: UUID): User | string {
    let resp = this.DB.getOne(id);
    return resp;
  }

  getAll(): User[] {
    let resp = this.DB.getAll();
    console.log(resp);
    return resp;
  }
}
