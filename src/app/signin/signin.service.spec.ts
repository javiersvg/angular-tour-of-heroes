import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { SigninService } from './signin.service';
import { MessageService } from '../message.service';

describe('SigninService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [SigninService, MessageService]
    });
  });

  it('should be created', inject([SigninService], (service: SigninService) => {
    expect(service).toBeTruthy();
  }));
});
