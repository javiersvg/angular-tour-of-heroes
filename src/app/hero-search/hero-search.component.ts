import { Component, OnInit } from '@angular/core';
import { FormControl }       from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import {startWith}    from 'rxjs/operators/startWith';
import {map}          from 'rxjs/operators/map';

import {
   switchMap
 } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero/hero.service';

export class User {
  constructor(public name: string) { }
}

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.css' ]
})
export class HeroSearchComponent implements OnInit {

  myControl = new FormControl();

  filteredOptions: Observable<Hero[]>;

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith<string | User>(''),
        map(value => typeof value === 'string' ? value : value.name),
        switchMap(name => this.filter(name))
      );
  }

  filter(name: string): Observable<Hero[]> {
    return this.heroService.search(name);
  }

}
