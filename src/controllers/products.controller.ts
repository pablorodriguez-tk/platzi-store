import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  // Ruta de productos que permite usar query
  @Get('products')
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 50,
    @Query('brand') brand: string,
  ) {
    return `products: limit => ${limit} offset => ${offset} brand => ${brand}`;
  }

  // Para que no tome filter como un :productId , hay que poner este antes
  @Get('filter')
  getProductFilter() {
    return `Yo soy un filter`;
  }

  // Ruta que admite param
  @Get(':productId')
  getProduct(@Param('productId') productId: string) {
    return `product ${productId}`;
  }
}
