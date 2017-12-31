import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Lesson} from "./lesson";
import {AngularFireDatabase} from "angularfire2/database";

@Injectable()
export class LessonsService {

  constructor(private angularFireDb: AngularFireDatabase) {
  }

  findAllLessons(): Observable<Lesson[]> {
    return this.angularFireDb.list('lessons').snapshotChanges()
      .do(console.log)
      .map(Lesson.fromJsonToList);
  }

  findLessonByUrl(lessonUrl: string): Observable<Lesson> {
    return this.angularFireDb.list('lessons', ref =>
      ref.orderByChild('url').equalTo(lessonUrl)).snapshotChanges()
      .map(results => Lesson.fromJson(results[0]));
  }

  loadNextLesson(courseId: string, lessonId: string): Observable<Lesson> {
    return this.angularFireDb.list(`lessonsPerCourse/${courseId}`,
      ref =>
        ref.orderByKey()
          .startAt(lessonId)
          .limitToFirst(2))
      .snapshotChanges()
      .map(resuts => resuts[1].key)
      .switchMap(lessonId => this.angularFireDb
        .object(`lessons/${lessonId}`)
        .snapshotChanges())
      .map(Lesson.fromJson);
  }

  loadPreviousLesson(courseId: string, lessonId: string): Observable<Lesson> {
    return this.angularFireDb.list(`lessonsPerCourse/${courseId}`,
      ref =>
        ref.orderByKey()
          .endAt(lessonId)
          .limitToFirst(2))
      .snapshotChanges()
      .map(resuts => resuts[0].key)
      .switchMap(lessonId => this.angularFireDb
        .object(`lessons/${lessonId}`)
        .snapshotChanges())
      .map(Lesson.fromJson);
  }
}
