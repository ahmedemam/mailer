import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Email } from './_models/email.interface';
import { Request } from 'express';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
  @Get()
  getMailMessage() {
    return { message: 'hello' };
  }

  @Post('/email')
  sendEmail(@Req() request: Request): any {
    console.log('controller', request.params);
    console.log('controller', request.body);
    console.log('controller', request.query);
    console.log('controller', request.res);

    
    return request.params;
    // return this.appService.sendEmail(email);
  }
}
