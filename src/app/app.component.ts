import { Component } from '@angular/core';
import {initializeApp, database} from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(){
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyAGFltFl0QaDbkdJn1vgros8AV50wDIHy4",
      authDomain: "angular-firebase-app-29ee9.firebaseapp.com",
      databaseURL: "https://angular-firebase-app-29ee9.firebaseio.com",
      projectId: "angular-firebase-app-29ee9",
      storageBucket: "angular-firebase-app-29ee9.appspot.com",
      messagingSenderId: "975029687258"
    };
    initializeApp(config);


    var root = database().ref();

    root.on('value', function (snap) {
      console.log(snap.val());
    });
  }
}
