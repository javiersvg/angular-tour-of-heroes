import { Component, OnInit } from '@angular/core';

import { MessageService } from '../message.service';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(
    public messageService: MessageService,
    private bottomSheetRef: MatBottomSheetRef<MessagesComponent>) {}

  ngOnInit() {}

  close() {
    this.bottomSheetRef.dismiss();
  }
}
