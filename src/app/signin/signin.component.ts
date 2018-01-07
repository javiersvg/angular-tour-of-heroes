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
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'onsuccess': param => this.onSignIn(param)
    });
  }

  public onSignIn(googleUser) {
    var basicProfile = googleUser.getBasicProfile();
    this.profile = new Profile();
    this.profile.id = basicProfile.getId();
    this.profile.name = basicProfile.getName();
    this.profile.imageUrl = basicProfile.getImageUrl();
    var response = googleUser.getAuthResponse();
    this.signinService.signin(response.token).subscribe();
  }

  public signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    this.profile = null;
  }

}
