import { Component, OnInit, Inject } from '@angular/core';

import { Hero } from '../../hero/hero';
import { HeroService } from '../hero.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { SigninService } from '../../signin/signin.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];

  constructor(
    private heroService: HeroService,
    private signinService: SigninService,
    public dialog: MatDialog) {
      this.signinService.loginconfirmed$.subscribe(_ => {
        this.getHeroes();
      });
     }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getAll()
    .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.add({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.delete(hero).subscribe();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewHeroDialog, {
      width: '250px',
      data: new Hero(),
    });
    dialogRef.afterClosed().subscribe(hero => {
      this.heroes.push(hero);
    });
  }
}

@Component({
  selector: 'new-hero-dialog',
  template: `
            <h2 mat-dialog-title>New Hero</h2>
            <mat-dialog-content>
              <app-hero-form [entity]="entity"></app-hero-form>
            </mat-dialog-content>
            <mat-dialog-actions>
              <button mat-button [disabled]="!entity.name" (click)="add()">Ok</button>
              <button mat-button (click)="closeDialog()">Cancel</button>
            </mat-dialog-actions>
            `
})
export class NewHeroDialog {
  entity: Hero;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NewHeroDialog>,
    private heroService: HeroService) {
      this.createForm();
    }

  createForm(): void {
    this.entity = new Hero();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  add(): void {
    this.heroService.add(this.entity)
      .subscribe(hero => {
        this.dialogRef.close(hero);
      });
  }
}
