import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import db from '../../db/remoteDb';
// import db from '../../db/Db';
import { User } from '../../db/db_types';
import { SUCCESS } from '../../utils/constants';
import { IdTo } from './user.dto';

@Injectable()
export class UserService {
  private DB: db = new db();

  getHello(): string {
    return 'hello from user';
  }

  async create(user: User): Promise<string> {
    let resp = await this.DB.create(user);
    return resp;
  }

  async put(user: User): Promise<string> {
    let resp = await this.DB.put(user);
    return resp;
  }

  async delete(id: UUID): Promise<string> {
    let resp = await this.DB.delete(id);
    return resp;
  }

  async getOne(id: UUID): Promise<User | string> {
    let resp = await this.DB.getOne(id);
    return resp;
  }

  async getAll(): Promise<User[]> {
    let resp = await this.DB.getAll();
    console.log(resp);
    return resp;
  }
}
