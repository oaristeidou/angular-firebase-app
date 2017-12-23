import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {AngularFireDatabase} from "angularfire2/database";
import {Course} from "./course";

@Injectable()
export class CoursesService {

  constructor(private angularFirebase: AngularFireDatabase) { }

  findAllCourses():Observable<Course[]>{
    return this.angularFirebase.list('courses').valueChanges()
      .map(Course.fromJsonArray);
  }
}
