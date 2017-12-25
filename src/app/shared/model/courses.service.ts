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

  findCourseByUrl(courseUrl:string):Observable<Course[]>{
    return this.angularFirebase.list('courses', ref => ref.orderByChild('url').equalTo(courseUrl)).valueChanges();
  }

  findLessonKeysPerCourseUrl(course$: Observable<Course[]>): Observable<Lesson[]>{
    return course$
      .switchMap(course => this.angularFirebase.list('lessonsPerCourse/${course.$key}').valueChanges())
      .map(lspc =>
        lspc.map(lsc =>
          this.angularFirebase.object('lessons/${lsc.$key}').valueChanges()))
      .flatMap(fbojs => Observable.combineLatest(fbojs))
      .do(console.log)
  }

  findLessonsForCourse(courseUrl: string): Observable<Lesson[]>{
    const course$ = this.findCourseByUrl(courseUrl);

    return this.findLessonKeysPerCourseUrl(course$);
      ;
  }
}
