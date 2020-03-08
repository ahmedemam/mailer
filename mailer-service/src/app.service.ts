import { Injectable, Post } from '@nestjs/common';

@Injectable()
export class AppService {
  @Post()
  sendEmail(): string {
    return 'This action adds a new cat';
  }
 
}
