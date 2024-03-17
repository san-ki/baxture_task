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
import { User } from '../../db/db_types';
import {
  SUCCESS,
  USER_ALREADY_EXIST,
  USER_NOT_FOUND,
} from '../../utils/constants';
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
  async getAll(): Promise<User[]> {
    return await this.userService.getAll();
  }

  @Get('/:userid')
  @UsePipes(new ValidationPipe())
  async getOne(@Param() id: IdTo): Promise<User | string> {
    console.log(id.userid);
    if (!id.userid) throw new BadRequestException('userid param is required');
    let user = await this.userService.getOne(id.userid);
    console.log(user);

    if (user == USER_NOT_FOUND)
      throw new NotFoundException(`User with ${id.userid} not found`);
    return user;
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async post(@Body() user: AddUserTo): Promise<string> {
    console.log(user, 'here');
    let status = await this.userService.create(user);
    if (status == USER_ALREADY_EXIST)
      throw new ConflictException('user already exist');
    return status;
  }

  @Put()
  @UsePipes(new ValidationPipe())
  async put(@Body() user: UserDto): Promise<string> {
    console.log(user, 'here');
    let status = await this.userService.put(user);
    if (status == USER_NOT_FOUND)
      throw new UnprocessableEntityException('user not found');
    if (status != SUCCESS) throw new InternalServerErrorException();
    return status;
  }

  @Delete('/:userid')
  @UsePipes(new ValidationPipe())
  async deleteUser(@Param() id: IdTo): Promise<string> {
    let status = await this.userService.delete(id.userid);
    console.log(status);
    if (status == USER_NOT_FOUND)
      throw new UnprocessableEntityException('user not found');
    if (status != SUCCESS) throw new InternalServerErrorException();
    return status;
  }
}
