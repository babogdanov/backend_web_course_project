import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return { key: 'Hello World!', value: 'HI!' };
  }
}
