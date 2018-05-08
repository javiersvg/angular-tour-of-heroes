import { Component, ElementRef, AfterViewInit, Input } from '@angular/core';
import { SigninService } from '../signin.service';
import { Profile } from '../profile';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  @Input() profile: Profile;

  constructor(private signinService: SigninService) {
  }

  public signOut() {
    this.signinService.signOut().subscribe(profile => {
      this.profile = null;
    });
  }

  public signIn() {
    this.signinService.signIn().subscribe(profile => {
      this.profile = profile;
    });
  }

}
