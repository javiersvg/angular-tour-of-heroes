import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

import { HeroFormComponent } from './hero-form/hero-form.component';

import { HeroService } from './hero.service';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent, NewHeroDialog } from './heroes/heroes.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatListModule,
    MatIconModule,
    MatDialogModule
  ],
  declarations: [
    HeroFormComponent,
    HeroDetailComponent,
    HeroesComponent,
    NewHeroDialog
  ],
  exports: [
    HeroFormComponent,
    HeroDetailComponent,
    HeroesComponent,
    NewHeroDialog
  ],
  entryComponents: [ NewHeroDialog ],
  providers: [ HeroService ]
})
export class HeroModule { }
