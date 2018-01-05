import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {firebaseConfig} from "../environments/firebase.config";
import {HomeComponent} from './home/home.component';
import {LessonsService} from "./shared/model/lessons.service";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/first';
import {ListLessonsComponent} from './list-lessons/list-lessons.component';
import {RouterModule} from "@angular/router";
import {routerConfig} from "./router.config";
import {TopMenuComponent} from './top-menu/top-menu.component';
import {CoursesComponent} from './courses/courses.component';
import {CoursesService} from "./shared/model/courses.service";
import {CourseDetailsComponent} from './course-details/course-details.component';
import { LessonDetailsComponent } from './lesson-details/lesson-details.component';
import {AngularFireModule} from "angularfire2";
import {AngularFireDatabaseModule} from "angularfire2/database";
import { SafeUrlPipe } from './shared/security/safe-url.pipe';
import {ReactiveFormsModule} from "@angular/forms";
import { NewLessonComponent } from './new-lesson/new-lesson.component';
import { LessonFormComponent } from './lesson-form/lesson-form.component';
import { EditLessonComponent } from './edit-lesson/edit-lesson.component';
import {LessonResolver} from "./shared/model/lesson.resolver";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AuthService} from "./shared/security/auth.service";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListLessonsComponent,
    TopMenuComponent,
    CoursesComponent,
    CourseDetailsComponent,
    LessonDetailsComponent,
    SafeUrlPipe,
    NewLessonComponent,
    LessonFormComponent,
    EditLessonComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    RouterModule.forRoot(routerConfig),
    ReactiveFormsModule
  ],
  providers: [LessonsService, CoursesService, LessonResolver, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
