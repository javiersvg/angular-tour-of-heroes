import { Component } from '@angular/core';

@Component({
  selector: 'toh-dashboard',
  templateUrl: './toh-dashboard.component.html',
  styleUrls: ['./toh-dashboard.component.css']
})
export class TohDashboardComponent {
  cards = [
    { title: 'Card 2', cols: 1, rows: 1 },
    { title: 'Card 3', cols: 1, rows: 2, image: "https://material.angular.io/assets/img/examples/shiba2.jpg" },
    { title: 'Card 4', cols: 1, rows: 1 }
  ];
}
