import { Component } from '@angular/core';

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

  navLinks = [
    new Link("DASHBOARD", "dashboard"),
    new Link("HEROES", "heroes")
  ]
}
