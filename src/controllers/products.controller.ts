import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';

import { Response } from 'express';
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
    // return {
    //   message: `products: limit => ${limit} offset => ${offset} brand => ${brand}`,
    // };
    return this.productsService.findAll();
  }

  // Para que no tome filter como un :productId , hay que poner este antes
  @Get('filter')
  getProductFilter() {
    return { message: `Yo soy un filter` };
  }

  // Ruta que admite param
  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED) //Podemos elegir nosotros que codigo devolver en la respuesta
  // Podemos poner una response personalizada de esta forma
  getProduct(@Res() response: Response, @Param('productId') productId: string) {
    // response.status(200).send({
    //   message: `product ${productId}`,
    // });
    return this.productsService.findOne(+productId); // el signo + lo pasa a numero, ya que nos llega un string
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: 'accion para crear',
      payload,
    };
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return { id, payload };
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return { id };
  }
}
