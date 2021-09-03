import { Body, Controller, Post } from '@nestjs/common';

@Controller('brands')
export class BrandsController {
  @Post()
  create(@Body() payload: any) {
    return {
      message: 'accion para crear',
      payload,
    };
  }
}
