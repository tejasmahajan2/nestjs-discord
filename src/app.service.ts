import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! I am using NgRok';
  }

  getMessage(): string {
    console.log()
    return 'Hello World!';
  }
}
