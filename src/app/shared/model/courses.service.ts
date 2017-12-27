import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {AngularFireAction, AngularFireDatabase, AngularFireObject, snapshotChanges} from "angularfire2/database";
import {Course} from "./course";
import {Lesson} from "./lesson";

@Injectable()
export class CoursesService {

  constructor(private angularFirebase: AngularFireDatabase) { }

  findAllCourses():Observable<Course[]> {
    return this.angularFirebase.list('courses').snapshotChanges()
      .map(Course.fromJsonArray);
  }


  findCourseByUrl(courseUrl:string): Observable<Course[]> {
    return this.angularFirebase.list('courses', ref =>
      ref.orderByChild('url').equalTo(courseUrl))
      .snapshotChanges()
      .map(Course.fromJsonArray);
  }


  findLessonKeysPerCourseUrl(courseUrl:string): Observable<string[]> {
    return this.findCourseByUrl(courseUrl)
      .do(val => console.log("course",val))
      .filter(course => !!course)
      .switchMap(course => this.angularFirebase.list(`lessonsPerCourse/${course[0].key}`).snapshotChanges())
      .map( lspc => lspc.map(lpc => lpc.key) );
  }


  findLessonsForLessonKeys(lessonKeys$: Observable<string[]>) :Observable<Lesson[]> {
    return lessonKeys$
      .map(lspc => lspc.map(lessonKey => this.angularFirebase.object('lessons/' + lessonKey).valueChanges()) )
      .mergeMap(fbojs => Observable.combineLatest(fbojs) )
  }


  findAllLessonsForCourse(courseUrl:string):Observable<Lesson[]> {
    return this.findLessonsForLessonKeys(this.findLessonKeysPerCourseUrl(courseUrl));
  }
}
