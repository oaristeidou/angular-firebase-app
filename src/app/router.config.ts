import {Route} from "@angular/router";
import {HomeComponent} from "./home/home.component";
/**
 * Created by odyssefs on 22.12.17.
 */
export const routerConfig: Route[] = [
  {
    path:'home',
    component: HomeComponent
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
