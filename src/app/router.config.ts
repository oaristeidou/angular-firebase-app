import {Route} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {CoursesComponent} from "./courses/courses.component";
import {CourseDetailsComponent} from "./course-details/course-details.component";
import {LessonDetailsComponent} from "./lesson-details/lesson-details.component";
import {NewLessonComponent} from "./new-lesson/new-lesson.component";
/**
 * Created by odyssefs on 22.12.17.
 */
export const routerConfig: Route[] = [
  {
    path:'home',
    component: HomeComponent
  },{
    path:'courses',
    children: [
      {
        path: ':id',
        children: [
          {
            path: '',
            component: CourseDetailsComponent
          },
          {
            path: 'new',
            component: NewLessonComponent
          }
        ]
      },
      {
        path: '',
        pathMatch:'full',
        component: CoursesComponent
      }
    ]
  },
  {
    path:'lessons/:id',
    component: LessonDetailsComponent
  },
  {
    path:'',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path:'**',
    redirectTo: 'home'
  }

];
