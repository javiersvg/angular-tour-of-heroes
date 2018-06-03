import { Component, OnInit, Inject } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

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
            <h2>New Hero</h2>
            <form [formGroup]="heroForm">
              <div *ngFor="let field of fields" class="form-group">
                <mat-form-field>
                  <input matInput [type]="field.type" class="form-control" [formControlName]="field.key"  [placeholder]="field.key">
                </mat-form-field>
              </div>
            </form>
            `
})
export class NewHeroDialog {
  fields = [];
  heroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.createForm();
    }

  createForm(): void {
    const controls: any = {};
    this.fields.push(new FormField('name'));
    this.fields.forEach(field => {
      controls[field.key] = new FormControl('');
    });
    this.heroForm = this.fb.group(controls);
  }
}

class FormField {
  key: string;
  type: string;

  constructor(key:string, type?: string) {
    this.key = key;
    this.type = type || '';
  }
}