import { Controller, Get, Query } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  list(
    @Query('id') id: string,
    @Query('email') email: string
  ) {
    return {message:"oi"};
  }

  @Get('user')
  getData(
    @Query('id') id: string,
    @Query('email') email: string
  ) {
    return this.appService.user({
      id,
      email
    });
  }
}
