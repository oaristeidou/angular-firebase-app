import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AngularFireModule} from "angularfire2";
import {firebaseConfig} from "../environments/firebase.config";
import {AngularFireDatabaseModule} from "angularfire2/database";
import { HomeComponent } from './home/home.component';
import {LessonsService} from "./shared/model/lessons.service";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [LessonsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
