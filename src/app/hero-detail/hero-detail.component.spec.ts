import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';

import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { HeroDetailComponent } from './hero-detail.component';
import { AppRoutingModule } from '../app-routing.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HeroesComponent } from '../heroes/heroes.component';
import { HeroSearchComponent } from '../hero-search/hero-search.component';

import { SigninService } from '../signin.service';
import { MessageService } from '../message.service';
import { HeroService } from "../hero.service";

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        HeroDetailComponent,
        DashboardComponent,
        HeroesComponent,
        HeroSearchComponent
      ],
      imports: [ 
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatDividerModule,
        MatIconModule,
        MatFormFieldModule,
        MatGridListModule,
        MatListModule,
        MatAutocompleteModule
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue : '/' },
        SigninService,
        MessageService,
        HeroService
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
