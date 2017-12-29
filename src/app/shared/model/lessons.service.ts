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
}
