import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {AngularFireDatabase, snapshotChanges} from "angularfire2/database";
import {Course} from "./course";
import {Lesson} from "./lesson";

@Injectable()
export class CoursesService {

  constructor(private angularFirebase: AngularFireDatabase) { }

  findAllCourses():Observable<Course[]> {
    return this.angularFirebase.list('courses').valueChanges()
      .map(Course.fromJsonArray);
  }


  findCourseByUrl(courseUrl:string): Observable<Course> {
    return this.angularFirebase.list('courses', ref =>
      ref.orderByChild('url').equalTo(courseUrl)).valueChanges()
      .map(results => results[0]);
  }


  findLessonKeysPerCourseUrl(courseUrl:string): Observable<string[]> {
    return this.findCourseByUrl(courseUrl)
      .do(val => console.log("course",val))
      .filter(course => !!course)
      .switchMap(course => this.angularFirebase.list(`lessonsPerCourse/${course.key}`).valueChanges())
      .map( lspc => lspc.map(lpc => lpc) );
  }


  findLessonsForLessonKeys(lessonKeys$: Observable<string[]>) :Observable<Lesson[]> {
    return lessonKeys$
      .map(lspc => lspc.map(lessonKey => this.angularFirebase.object('lessons/' + lessonKey).valueChanges()) )
      .flatMap(fbojs => Observable.combineLatest(fbojs) )

  }


  findAllLessonsForCourse(courseUrl:string):Observable<Lesson[]> {
    return this.findLessonsForLessonKeys(this.findLessonKeysPerCourseUrl(courseUrl));
  }
}
