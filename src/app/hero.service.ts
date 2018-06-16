import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Hero } from './hero';
import { MessageService } from './message.service';
import { HalService } from './hal.service';
@Injectable()
export class HeroService  extends HalService<Hero> {
  constructor(
    http: HttpClient,
    messageService: MessageService) {
      super(http,messageService, "heroes");
  }
}
