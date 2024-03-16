import { Test, TestingModule } from '@nestjs/testing';
import DataBase from './Db';
import { User } from './db_types';

describe('DB tests', () => {
  let db = new DataBase();
  let mockUser: User = {
    username: 'check',
    age: 12,
    hobbies: ['123', '234'],
  };

  // describe('check', () => {
  //   it('should log', () => {
  //     const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

  //     db.logger.log('check');
  //     expect(consoleLogSpy).toHaveBeenCalledWith(
  //       expect.stringContaining('check'),
  //     );

  //     consoleLogSpy.mockRestore();
  //   });
  // });

  describe('db tests', () => {
    it('should add user', () => {
      db.create(mockUser);
      expect(Object.keys(db.users).length).toBe(1);
    });

    it('should get all', () => {
      let users = db.getAll();
      expect(users).toBeInstanceOf(Array);
      expect(users.length).toBe(1);
    });

    it('should update', () => {
      let users = db.getAll();
      let curUser = users[0];
      curUser.age = 29;
      db.put(curUser);
      users = db.getAll();
      curUser = users[0];
      expect(curUser.age).toBe(29);
    });

    it('should delete', () => {
      let users = db.getAll();
      let curUser = users[0];
      db.delete(curUser.id);
      users = db.getAll();
      expect(users.length).toBe(0);
    });
  });
});
