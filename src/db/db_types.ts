import { UUID } from 'crypto';

export interface User {
  id?: UUID;
  username: string;
  age: number;
  hobbies: string[];
}

export type dbStorage = {
  [id: UUID]: User;
};
