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
import { ValidationPipe } from '../../shared/pipes/validation/validation.pipe';
import { UserDto, IdTo, AddUserTo } from './user.dto';

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
  @UsePipes(new ValidationPipe())
  async getOne(@Param() id: IdTo): Promise<User | string> {
    console.log(id.id);
    if (!id.id) throw new BadRequestException('userid param is required');
    let user = this.userService.getOne(id.id);
    console.log(user);

    if (user == USER_NOT_FOUND)
      throw new NotFoundException(`User with ${id} not found`);
    return user;
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async post(@Body() user: AddUserTo): Promise<string> {
    console.log(user, 'here');
    let status = this.userService.create(user);
    if (status == USER_ALREADY_EXIST)
      throw new ConflictException('user already exist');
    return status;
  }

  @Put()
  @UsePipes(new ValidationPipe())
  async put(@Body() user: UserDto): Promise<string> {
    console.log(user, 'here');
    let status = this.userService.put(user);
    if (status == USER_NOT_FOUND)
      throw new UnprocessableEntityException('user not found');
    if (status != SUCCESS) throw new InternalServerErrorException();
    return status;
  }

  @Delete('/:userid')
  @UsePipes(new ValidationPipe())
  async deleteUser(@Param() id: IdTo): Promise<string> {
    console.log(id);
    let status = this.userService.delete(id.id);
    if (status == USER_NOT_FOUND)
      throw new UnprocessableEntityException('user not found');
    if (status != SUCCESS) throw new InternalServerErrorException();
    return status;
  }
}
