import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/db/db_types';
import { UUID } from 'crypto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Get()
  // getHello(): string {
  //   return this.userService.getHello();
  // }

  @Get()
  getAll(): User[] {
    return this.userService.getAll();
  }

  @Get('/:userid')
  getOne(@Param('userid') id: UUID): User {
    console.log(id);
    return this.userService.getOne(id);
  }

  @Post()
  post(@Body() user: User): string {
    console.log(user, 'here');
    return this.userService.create(user);
  }

  @Put()
  put(@Body() user: User): string {
    console.log(user, 'here');
    return this.userService.put(user);
  }

  @Delete('/:userid')
  deleteUser(@Param('userid') id: UUID): string {
    console.log(id);
    return this.userService.delete(id);
  }
}
