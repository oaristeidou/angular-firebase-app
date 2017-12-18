import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {AngularFireDatabase, AngularFireList, AngularFireObject} from "angularfire2/database";
import {tokenKey} from "@angular/core/src/view";
import {tokenReference} from "@angular/compiler";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  courses$: AngularFireList<any>;
  lesson$: AngularFireObject<any>;
  firstCourse: any;

  constructor(db: AngularFireDatabase) {

    this.courses$ = db.list('courses');

    this.courses$.valueChanges().subscribe(console.log);

    this.lesson$ = db.object('lessons/-L0X0Duk2oY_2GefTket');

    this.lesson$.valueChanges().subscribe(console.log);

    this.courses$.valueChanges()
      .pipe()
      .subscribe(
        course => this.firstCourse=course.pop()
      )
  }

  listPush(){
    this.courses$.push({description: 'Test new course'} as any)
      .then(
        () => console.log("Push new course!!!")
        , console.error
      );
  }

  listRemove(){
    this.courses$.remove(this.firstCourse)
      .then(
        ()=> console.log("Remove the first course!!!")
        , console.error);

  }

  listUpdate(){
    this.courses$.update(this.firstCourse, {description: 'Angular Update'} as any)
  }

  objUpdate(){

  }

  objSet(){

  }

}
