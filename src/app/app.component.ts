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

  }
}
