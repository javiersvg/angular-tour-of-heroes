import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import {MatFormFieldModule} from '@angular/material/form-field';

import { HeroFormComponent } from './hero-form.component';

import { InMemoryDataService } from '../in-memory-data.service';

describe('HeroFormComponent', () => {
  let component: HeroFormComponent;
  let fixture: ComponentFixture<HeroFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({      
      declarations: [ HeroFormComponent ],
      imports: [ 
        FormsModule, 
        ReactiveFormsModule, 
        MatFormFieldModule,
        HttpClientInMemoryWebApiModule.forRoot(
          InMemoryDataService, { dataEncapsulation: false }
        ), ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
