import { Component, OnInit, Inject } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

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
    let dialogRef = this.dialog.open(NewHeroDialog, {
      width: '250px',
      data: new Hero(),
    })
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
              <form [formGroup]="form">
                <div *ngFor="let field of fields" class="form-group">
                  <mat-form-field>
                    <input matInput [type]="field.type" class="form-control" [formControlName]="field.key"  [placeholder]="field.key">
                  </mat-form-field>
                </div>
              </form>
            </mat-dialog-content>
            <mat-dialog-actions>
              <button mat-button [disabled]="!form.valid" (click)="add()">Ok</button>
              <button mat-button (click)="closeDialog()">Cancel</button>
            </mat-dialog-actions>
            `
})
export class NewHeroDialog {
  fields = [];
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NewHeroDialog>,
    private heroService: HeroService) {
      this.createForm();
    }

  createForm(): void {
    const controls: any = {};
    this.fields.push(new FormField('name', this.data.name));
    this.fields.forEach(field => {
      controls[field.key] = new FormControl(field.value, Validators.required);
    });
    this.form = this.fb.group(controls);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  add(): void {
    let entity = new Hero();
    this.fields.forEach(field => {
      entity[field.key] = this.form.controls[field.key].value;
      this.form.controls[field.key].setValue(field.value);
    })
    this.heroService.addHero(entity)
      .subscribe(hero => {
        this.dialogRef.close(hero);
      });
  }
}

class FormField {
  key: string;
  value: string;
  type: string;

  constructor(key:string, value?: string, type?: string) {
    this.key = key;
    this.value = value || '';
    this.type = type || '';
  }
}