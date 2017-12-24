import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {AngularFireDatabase, snapshotChanges} from "angularfire2/database";
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
    const course$ = this.angularFirebase.list('courses', ref => ref.orderByChild('url').equalTo(courseUrl)).valueChanges();

    const lessonsPerCourse$ = course$
      .switchMap(snapshot => this.angularFirebase
        .list(`lessonsPerCourse/`)
        .valueChanges())
        .do(console.log);


    course$.subscribe();
    lessonsPerCourse$.subscribe();

    return Observable.of([]);

  }
}
