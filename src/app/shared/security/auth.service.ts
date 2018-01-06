import {Injectable} from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import {Observable, Subject} from "rxjs";

@Injectable()
export class AuthService {

  constructor(private fireAuth: AngularFireAuth) {
  }

  login(email: string, password: string): Observable<any> {
    return this.fromFirebaseAuthPromise(this.fireAuth.auth.signInWithEmailAndPassword(email, password));
  }

  fromFirebaseAuthPromise(promise): Observable<any> {

    const subject = new Subject<any>();

    promise
      .then(res => {
          subject.next(res);
          subject.complete();
        },
        err => {

          subject.error(err);
          subject.complete();
        });

    return subject.asObservable();
  }

}
