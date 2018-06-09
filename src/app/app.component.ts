import { Component } from '@angular/core';
import { MatBottomSheetRef, MatBottomSheet } from '@angular/material/bottom-sheet';

import { MessagesComponent } from './messages/messages.component';

export class Link {
  constructor(public label: string, public path: string) {}
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';
  bottomSheetRef: MatBottomSheetRef<MessagesComponent>;

  constructor(private bottomSheet: MatBottomSheet){}

  navLinks = [
    new Link('DASHBOARD', 'dashboard'),
    new Link('HEROES', 'heroes')
  ];

  toggleMessages() {
    if(this.bottomSheetRef) {
      this.bottomSheetRef.dismiss();
    } else {
      this.bottomSheetRef = this.bottomSheet.open(MessagesComponent);
      this.bottomSheetRef.afterDismissed().subscribe(() => this.bottomSheetRef = null);
    }
  }
}
