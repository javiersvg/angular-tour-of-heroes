import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';

import { AppRoutingModule } from '../app-routing.module';
import { HeroModule } from '../hero/hero.module';

import { TohDashboardComponent } from './toh-dashboard.component';
import { HeroSearchComponent } from '../hero-search/hero-search.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

import { MessageService } from '../message.service';
import { InMemoryDataService } from '../in-memory-data.service';

describe('TohDashboardComponent', () => {
  let component: TohDashboardComponent;
  let fixture: ComponentFixture<TohDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        TohDashboardComponent,
        HeroSearchComponent,
        DashboardComponent,
      ],
      imports: [
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        HttpClientInMemoryWebApiModule.forRoot(
          InMemoryDataService, { dataEncapsulation: false }
        ),
        MatGridListModule,
        MatMenuModule,
        MatIconModule,
        MatCardModule,
        MatAutocompleteModule,
        MatOptionModule,
        MatFormFieldModule,
        MatListModule,
        MatInputModule,
        HeroModule
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue : '/' },
        MessageService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TohDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
