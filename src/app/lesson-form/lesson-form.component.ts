import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {validUrl} from "../shared/validators/validUrl";

@Component({
  selector: 'app-lesson-form',
  templateUrl: './lesson-form.component.html',
  styleUrls: ['./lesson-form.component.css']
})
export class LessonFormComponent implements OnInit, OnChanges {

  form:FormGroup;

  @Input()
  initialValue:any;

  constructor(private formBuilder: FormBuilder) {
    this.form= this.formBuilder.group({
      description: ['',Validators.required],
      url: ['',Validators.required],
      videoUrl: ['',[Validators.required, validUrl]],
      tags: ['',Validators.required],
      longDescription: ['']
    })
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['initialValue'])
      this.form.patchValue(changes['initialValue'].currentValue);
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
