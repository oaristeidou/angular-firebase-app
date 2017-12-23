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
import { ListLessonsComponent } from './list-lessons/list-lessons.component';
import {RouterModule} from "@angular/router";
import {routerConfig} from "./router.config";
import { TopMenuComponent } from './top-menu/top-menu.component';
import { CoursesComponent } from './courses/courses.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListLessonsComponent,
    TopMenuComponent,
    CoursesComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    RouterModule.forRoot(routerConfig)
  ],
  providers: [LessonsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
