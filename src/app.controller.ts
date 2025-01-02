import { Body, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('message')
  getMessage(@Body() data : any): string {
    console.log(data)
    return this.appService.getMessage();
  }
}
