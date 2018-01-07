import {Injectable} from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {AuthInfo} from "./auth-info";

@Injectable()
export class AuthService {

  static UNKNOWN_USER = new AuthInfo(null);

  authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(AuthService.UNKNOWN_USER);

  constructor(private fireAuth: AngularFireAuth) {
  }

  login(email: string, password: string): Observable<any> {
    return this.fromFirebaseAuthPromise(this.fireAuth.auth.signInWithEmailAndPassword(email, password));
  }

  signUp(email: string, password: string): Observable<any> {
    return this.fromFirebaseAuthPromise(this.fireAuth.auth.createUserWithEmailAndPassword(email, password));
  }

  fromFirebaseAuthPromise(promise): Observable<any> {

    const subject = new Subject<any>();

    promise
      .then(res => {
          const authInfo$ = new AuthInfo(this.fireAuth.auth.currentUser.uid);
          this.authInfo$.next(authInfo$);
          subject.next(res);
          subject.complete();
        },
        err => {
          this.authInfo$.error(err);
          subject.error(err);
          subject.complete();
        });
    return subject.asObservable();
  }



}
