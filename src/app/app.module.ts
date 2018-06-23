import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './/app-routing.module';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { SigninComponent } from './signin/signin.component';

import { MessageService } from './message.service';
import { SigninService } from './signin.service';
import { HeroModule } from './hero/hero.module';
import { TohDashboardComponent } from './toh-dashboard/toh-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    HeroSearchComponent,
    SigninComponent,
    TohDashboardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HeroModule,
  ],
  entryComponents: [ MessagesComponent ],
  providers: [ MessageService, SigninService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
