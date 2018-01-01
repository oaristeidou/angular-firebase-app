import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {validUrl} from "../shared/validators/validUrl";

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
      videoUrl: ['',[Validators.required, validUrl]],
      tags: ['',Validators.required],
      longDescription: ['']
    })
  }

  isErrorVisible(field:string, error:string) {
    return this.form.controls[field].dirty
      && this.form.controls[field].errors &&
      this.form.controls[field].errors[error];
  }

  reset(){
    this.form.reset();
  }

  get valid(){
    return this.form.valid;
  }

  get value(){
    return this.form.value;
  }


}
