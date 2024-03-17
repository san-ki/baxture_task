import axios from 'axios';
import { User } from './db_types';
import { UUID } from 'crypto';

class DB {
  baseUrl: string;

  constructor() {
    this.baseUrl = `http://localhost:${process.env.DB_PORT}`;
  }

  async getAll(): Promise<User[]> {
    let result = await axios.get(`${this.baseUrl}/users`);
    return result.data;
  }

  async create(user: User): Promise<string> {
    let result = await axios.post(`${this.baseUrl}/users`, { ...user });
    return result.data;
  }

  async put(user: User): Promise<string> {
    let result = await axios.put(`${this.baseUrl}/users`, { ...user });
    return result.data;
  }

  async delete(id: UUID): Promise<string> {
    let result = await axios.delete(`${this.baseUrl}/users/${id}`);
    return result.data;
  }

  async getOne(id: UUID): Promise<User | string> {
    let result = await axios.get(`${this.baseUrl}/users/${id}`);
    return result.data;
  }
}

export default DB;
