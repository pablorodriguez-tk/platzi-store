import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Al entrar a cada una de estas rutas nos devuelve una pagina diferente

  @Get()
  getHello(): string {
    return 'Hola mundo!';
  }

  @Get('nuevo') //No es necesario poner slash
  newEndpoint() {
    return 'Yo soy nuevo';
  }

  @Get('/ruta/') //No es necesario poner slash, pero si lo ponemos igual funciona
  hello() {
    return 'con /sas/';
  }

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
  @Get('products/filter')
  getProductFilter() {
    return `Yo soy un filter`;
  }

  // Ruta que admite param
  @Get('products/:productId')
  getProduct(@Param('productId') productId: string) {
    return `product ${productId}`;
  }

  @Get('categories/:id/products/:productId')
  getCategory(@Param('productId') productId: string, @Param('id') id: string) {
    return `product ${productId} and category ${id}`;
  }
}
