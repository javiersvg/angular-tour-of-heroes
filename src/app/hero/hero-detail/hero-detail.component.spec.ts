import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';

import { HeroModule } from '../../hero/hero.module';

import { AppRoutingModule } from '../../app-routing.module';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroSearchComponent } from '../../hero-search/hero-search.component';
import { TohDashboardComponent } from '../../toh-dashboard/toh-dashboard.component';

import { SigninService } from '../../signin.service';
import { MessageService } from '../../message.service';
import { HeroService } from '../../hero/hero.service';
import { InMemoryDataService } from '../../in-memory-data.service';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeroSearchComponent,
        TohDashboardComponent
      ],
      imports: [
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(
          InMemoryDataService, { dataEncapsulation: false }
        ),
        MatDividerModule,
        MatIconModule,
        MatFormFieldModule,
        MatGridListModule,
        MatListModule,
        MatAutocompleteModule,
        MatMenuModule,
        MatCardModule,
        HeroModule
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
