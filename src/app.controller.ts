import { Controller, Get } from '@nestjs/common';
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
}
