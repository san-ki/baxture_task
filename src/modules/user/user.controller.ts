import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  NotFoundException,
  ConflictException,
  BadRequestException,
  UnprocessableEntityException,
  InternalServerErrorException,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/db/db_types';
import { UUID } from 'crypto';
import {
  SUCCESS,
  USER_ALREADY_EXIST,
  USER_NOT_FOUND,
} from 'src/utils/constants';
import { ValidationPipe } from 'src/shared/pipes/validation/validation.pipe';

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

  @UsePipes(new ValidationPipe())
  @Get('/:userid')
  getOne(@Param('userid') id: UUID): User | string {
    console.log(id);
    if (!id) throw new BadRequestException('userid param is required');
    let user = this.userService.getOne(id);
    console.log(user);

    if (user == USER_NOT_FOUND)
      throw new NotFoundException(`User with ${id} not found`);
    return user;
  }

  @UsePipes(new ValidationPipe())
  @Post()
  post(@Body() user: User): string {
    console.log(user, 'here');
    let status = this.userService.create(user);
    if (status == USER_ALREADY_EXIST)
      throw new ConflictException('user already exist');
    return status;
  }

  @UsePipes(new ValidationPipe())
  @Put()
  put(@Body() user: User): string {
    console.log(user, 'here');
    let status = this.userService.put(user);
    if (status == USER_NOT_FOUND)
      throw new UnprocessableEntityException('user not found');
    if (status != SUCCESS) throw new InternalServerErrorException();
    return status;
  }

  @UsePipes(new ValidationPipe())
  @Delete('/:userid')
  deleteUser(@Param('userid') id: UUID): string {
    console.log(id);
    let status = this.userService.delete(id);
    if (status == USER_NOT_FOUND)
      throw new UnprocessableEntityException('user not found');
    if (status != SUCCESS) throw new InternalServerErrorException();
    return status;
  }
}
