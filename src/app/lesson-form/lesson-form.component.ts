import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-lesson-form',
  templateUrl: './lesson-form.component.html',
  styleUrls: ['./lesson-form.component.css']
})
export class LessonFormComponent implements OnInit {

  form:FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form= this.formBuilder.group({
      description: ['',Validators.required],
      url: ['',Validators.required],
      videoUrl: ['',[Validators.required]],
      tags: ['',Validators.required],
      longDescription: ['']
    })
  }

  isErrorVisible(field:string, error:string) {
    return this.form.controls[field].dirty
      && this.form.controls[field].errors &&
      this.form.controls[field].errors[error];
  }

}
