import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';

import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { AppRoutingModule } from '../app-routing.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HeroesComponent } from '../heroes/heroes.component';
import { HeroSearchComponent } from './hero-search.component';
import { HeroFormComponent } from '../hero-form/hero-form.component';

import { SigninService } from '../signin.service';
import { MessageService } from '../message.service';
import { HeroService } from '../hero.service';

describe('HeroSearchComponent', () => {
  let component: HeroSearchComponent;
  let fixture: ComponentFixture<HeroSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeroDetailComponent,
        DashboardComponent,
        HeroesComponent,
        HeroSearchComponent,
        HeroFormComponent
      ],
      imports: [
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatDividerModule,
        MatIconModule,
        MatFormFieldModule,
        MatGridListModule,
        MatListModule,
        MatAutocompleteModule,
        MatInputModule
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
    fixture = TestBed.createComponent(HeroSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
