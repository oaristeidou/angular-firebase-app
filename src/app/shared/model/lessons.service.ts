import {Inject, Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Lesson} from "./lesson";
import {AngularFireDatabase} from "angularfire2/database";
import {FirebaseApp} from "angularfire2";

@Injectable()
export class LessonsService {

  sdkDb:any;

  constructor(private angularFireDb: AngularFireDatabase, @Inject(FirebaseApp) fb) {
    this.sdkDb = fb.database().ref()
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

  createNewLesson(courseId: string, lesson: any): Observable<any>{
    const lessonsToSave = Object.assign({}, lesson, {courseId});

    const newLessonKey = this.sdkDb.child('lessons').push().key;

    let dataToSave = {};

    dataToSave[`lessons/${newLessonKey}`] = lessonsToSave;
    dataToSave[`lessonsPerCourse/${courseId}/${newLessonKey}`] = true;

    return this.firebaseUpdate(dataToSave);

  }

  saveLesson(lessonId:string, lesson:Lesson):Observable<Lesson>{
    const lessonToSave = Object.assign({}, lesson);
    delete (lessonToSave.key);

    let dataToSave={};
    dataToSave[`lessons/${lessonId}`]=lessonToSave;

    return this.firebaseUpdate(dataToSave);
  }

  firebaseUpdate(dataToSave: {}) {
    const subject = new Subject();

    this.sdkDb.update(dataToSave)
      .then(
        val => {
          subject.next(val);
          subject.complete();
        },
        err => {
          subject.next(err);
          subject.complete();
        }
      );
    return subject.asObservable();
  }
}
