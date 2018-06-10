import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent implements OnInit {
  @Input() entity: Hero;
  fields = [];
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const controls: any = {};
    this.fields.push(new FormField('name', this.entity.name));
    this.fields.forEach(field => {
      controls[field.key] = new FormControl(field.value, Validators.required);
    });
    this.form = this.fb.group(controls);
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