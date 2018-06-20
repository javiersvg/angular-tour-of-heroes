import { async, TestBed, inject } from '@angular/core/testing';

import { MatBottomSheetModule, MatBottomSheet } from '@angular/material/bottom-sheet';

import { MessagesComponent } from './messages.component';

import { MessageService } from '../message.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

describe('MessagesComponent', () => {
  let bottomSheet: MatBottomSheet;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatBottomSheetModule, NoopAnimationsModule, BottomSheetTestModule ],
      providers: [ MessageService ],
    })
    .compileComponents();
  }));

  beforeEach(inject([MatBottomSheet],
    (bs: MatBottomSheet, ) => {
      bottomSheet = bs;
    }));

  it('should create', () => {
    expect(bottomSheet.open(MessagesComponent)).toBeTruthy();
  });
});

// Create a real (non-test) NgModule as a workaround for
// https://github.com/angular/angular/issues/10760
const TEST_DIRECTIVES = [
  MessagesComponent,
];

@NgModule({
  imports: [MatBottomSheetModule, NoopAnimationsModule],
  exports: TEST_DIRECTIVES,
  declarations: TEST_DIRECTIVES,
  entryComponents: [
    MessagesComponent,
  ],
})
class BottomSheetTestModule { }
