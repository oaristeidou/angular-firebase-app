import { Component } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Observable} from "rxjs";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  courses: AngularFirestoreCollection<any[]>;

  constructor(private db : AngularFirestore){
    this.courses = db.collection("courses");
    db.persistenceEnabled$.subscribe(
      value => console.log(value)
    )

    const collection: AngularFirestoreCollection<any> = db.collection('courses');

// Notice how the observable is separated from write options
    const collection$: Observable<any> = collection.valueChanges();
    collection$.subscribe(data => console.log(data))

  }
}
