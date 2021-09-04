import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { ProductsService } from '../services/products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  // Ruta de productos que permite usar query
  @Get()
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 50,
    @Query('brand') brand: string,
  ) {
    return this.productsService.findAll();
  }

  // Para que no tome filter como un :productId , hay que poner este antes
  @Get('filter')
  getProductFilter() {
    return { message: `Yo soy un filter` };
  }

  // Ruta que admite param
  @Get(':productId')
  getProduct(@Param('productId') productId: string) {
    return this.productsService.findById(+productId); // el signo + lo pasa a numero, ya que nos llega un string
  }

  @Post()
  create(@Body() payload: any) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return this.productsService.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productsService.delete(+id);
  }
}
