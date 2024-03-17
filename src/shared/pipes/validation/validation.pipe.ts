import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (!value) throw new BadRequestException('no data provided');

    const object = plainToClass(metadata.metatype, value);
    const errors = await validate(object);

    console.log(metadata.metatype, value, 'hereobjs');

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return value;
  }
}
