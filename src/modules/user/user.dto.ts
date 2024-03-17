import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class UserDto {
  @IsUUID()
  id: UUID;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  @IsArray()
  hobbies: string[];
}

export class AddUserTo {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  @IsArray()
  hobbies: string[];
}

export class IdTo {
  @IsUUID()
  id: UUID;
}
