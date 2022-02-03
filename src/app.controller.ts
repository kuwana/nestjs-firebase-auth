import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  @UseGuards(AuthGuard)
  getHello(@Req() req: Request): string {
    // return this.appService.getHello();
    return 'Hello ' + req.user?.email + '!';
  }
}
