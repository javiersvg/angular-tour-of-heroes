import { Component, OnInit, Inject } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];

  constructor(
    private heroService: HeroService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

  openDialog(): void {
    this.dialog.open(NewHeroDialog, {
      width: '250px'
    })
  }
}

@Component({
  selector: 'new-hero-dialog',
  template: `
            <form [formGroup]="heroForm">
              <div class="form-group">
                <label class="center-block">Name:
                  <input class="form-control" formControlName="name">
                </label>
              </div>
            </form>
            `
})
export class NewHeroDialog {

  heroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.createForm();
    }

  createForm(): void {
    this.heroForm = this.fb.group(new Hero());
  }


}