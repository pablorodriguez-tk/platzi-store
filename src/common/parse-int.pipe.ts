import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: any) {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException(`${value} is not a number`);
    }
    return val;
  }
}
