import { Component, ElementRef, AfterViewInit, Input } from '@angular/core';
import { SigninService } from "../signin.service";
import { Profile } from "../profile";

declare const gapi: any;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements AfterViewInit {
  @Input() profile: Profile;

  constructor(private signinService: SigninService) {

  }

  ngAfterViewInit() {
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: '204566820246-67tser74gtv78uiaskm945enn5b5agl2.apps.googleusercontent.com',
        scope: 'profile email'
      });
    });
  }

  public signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    this.profile = null;
  }

  public signIn() {
    var auth2 = gapi.auth2.getAuthInstance();
    var numCallback = (resp: any)  => {
      this.signinService.signin(resp.code).subscribe();
    }
    auth2.grantOfflineAccess({
      redirect_URI: 'postmessage'
    }).then(numCallback);
  }

}
