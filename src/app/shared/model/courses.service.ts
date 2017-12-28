import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {AngularFireAction, AngularFireDatabase, AngularFireObject, snapshotChanges} from "angularfire2/database";
import {Course} from "./course";
import {Lesson} from "./lesson";

@Injectable()
export class CoursesService {

  constructor(private angularFirebase: AngularFireDatabase) {
  }

  findAllCourses(): Observable<Course[]> {
    return this.angularFirebase.list('courses').snapshotChanges()
      .map(Course.fromJsonArray);
  }


  findCourseByUrl(courseUrl: string): Observable<Course[]> {
    return this.angularFirebase.list('courses', ref =>
      ref.orderByChild('url').equalTo(courseUrl))
      .snapshotChanges()
      .map(Course.fromJsonArray);
  }


  findLessonKeysPerCourseUrl(courseUrl: string, pageSize: number = 10, lastLessonKey: string = ''): Observable<string[]> {
    return this.findCourseByUrl(courseUrl)
      .do(val => console.log("course", val))
      .filter(course => !!course)
      .switchMap(course => this.angularFirebase.list(`lessonsPerCourse/${course[0].key}`,
        ref => ref
          .limitToFirst(pageSize + 1)
          .startAt(lastLessonKey)
          .orderByKey()
      ).snapshotChanges())
      .map(lspc => lspc.map(lpc => lpc.key));
  }

  findLessonKeysPerCourseUrlPreviousPage(courseUrl: string, pageSize: number = 10, firstLessonKey: string = ''): Observable<string[]> {
    return this.findCourseByUrl(courseUrl)
      .do(val => console.log("course", val))
      .filter(course => !!course)
      .switchMap(course => this.angularFirebase.list(`lessonsPerCourse/${course[0].key}`,
        ref => ref
          .limitToLast(pageSize + 1)
          .endAt(firstLessonKey)
          .orderByKey()
      ).snapshotChanges())
      .map(lspc => lspc.map(lpc => lpc.key));
  }


  findLessonsForLessonKeys(lessonKeys$: Observable<string[]>): Observable<Lesson[]> {
    return lessonKeys$
      .map(lspc => lspc.map(lessonKey =>
        this.angularFirebase
          .object('lessons/' + lessonKey)
          .snapshotChanges()
          .map(Lesson.fromJson)))
      .mergeMap(fbojs => Observable.combineLatest(fbojs));
  }

  loadFirstLessonsPage(courseUrl: string, pageSize: number):Observable<Lesson[]>{
    const firstPagelessonKeys$ = this.findLessonKeysPerCourseUrl(courseUrl, pageSize);
    return this.findLessonsForLessonKeys(firstPagelessonKeys$);
  }


  findAllLessonsForCourse(courseUrl: string): Observable<Lesson[]> {
    return this.findLessonsForLessonKeys(this.findLessonKeysPerCourseUrl(courseUrl));
  }

  loadNextPage(courseUrl: string,
               lastCourseKey: string,
               pageSize: number): Observable<Lesson[]>{
    return this.findLessonsForLessonKeys(this.findLessonKeysPerCourseUrl(courseUrl, pageSize, lastCourseKey));
  }

  loadPreviousPage(courseUrl: string,
               firstCourseKey: string,
               pageSize: number): Observable<Lesson[]>{
    return this.findLessonsForLessonKeys(this.findLessonKeysPerCourseUrlPreviousPage(courseUrl, pageSize, firstCourseKey));
  }
}
