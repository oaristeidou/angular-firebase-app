import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {AngularFireDatabase} from "angularfire2/database";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';



  items: Observable<any[]>;

  constructor(db: AngularFireDatabase) {

    this.items = db.list('courses').valueChanges();

    this.items.subscribe(
      values => console.log(values)
    )
  }
}
