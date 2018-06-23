import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero/hero';
import { HeroService } from '../hero/hero.service';

@Component({
  selector: 'toh-dashboard',
  templateUrl: './toh-dashboard.component.html',
  styleUrls: ['./toh-dashboard.component.css']
})
export class TohDashboardComponent implements OnInit {
  heroes: Hero[] = [];
  cards = [
    { title: 'Card 2', cols: 1, rows: 1 },
    { title: 'Card 3', cols: 1, rows: 2, image: 'https://material.angular.io/assets/img/examples/shiba2.jpg' },
    { title: 'Card 4', cols: 1, rows: 1 }
  ];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getAll()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }
}
