import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {AngularFireDatabase} from "angularfire2/database";
import {Course} from "./course";
import {Lesson} from "./lesson";

@Injectable()
export class CoursesService {

  constructor(private angularFirebase: AngularFireDatabase) { }

  findAllCourses():Observable<Course[]>{
    return this.angularFirebase.list('courses').valueChanges()
      .map(Course.fromJsonArray);
  }

  findLessonsForCourse(courseUrl: string): Observable<Lesson[]>{
    console.log(courseUrl);
    this.angularFirebase
      .list('courses',
        ref => ref.orderByChild('url').equalTo(courseUrl)
      )
      .valueChanges()
      .do(console.log);
    return Observable.of([]);

  }
}
