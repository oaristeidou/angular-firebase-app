import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {AngularFireDatabase, AngularFireObject} from "angularfire2/database";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';



  courses: Observable<any[]>;

  constructor(db: AngularFireDatabase) {

    this.courses = db.list('courses').valueChanges();

    this.courses.subscribe(
      values => console.log(values)
    );

    const course : AngularFireObject<any> = db.object('courses/-L0X0DugysTbstWKG0fe');

    course.valueChanges().subscribe(console.log);
  }
}
