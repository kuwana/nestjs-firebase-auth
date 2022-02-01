import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  getHello(@Req() req: Request): string {
    // return this.appService.getHello();
    return 'Hello ' + req.user?.email + '!';
  }
}
