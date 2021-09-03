import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  @Get(':id/products/:productId')
  getCategory(@Param('productId') productId: string, @Param('id') id: string) {
    return { message: `product ${productId} and category ${id}` };
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: 'accion para crear',
      payload,
    };
  }
}
