import {Route} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {CoursesComponent} from "./courses/courses.component";
import {CourseDetailsComponent} from "./course-details/course-details.component";
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
        component: CourseDetailsComponent
      },
      {
        path: '',
        pathMatch:'full',
        component: CoursesComponent
      }
    ]
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
