import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
/**
 * Created by odyssefs on 07.01.18.
 */
@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private authService: AuthService,
  private router:Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {

    return this.authService.authInfo$
      .map(authInfo => authInfo.isLoggedIn())
      .first()
      .do(allowed=>{
        if (!allowed)
          this.router.navigateByUrl('/login')
      });
  }

}
