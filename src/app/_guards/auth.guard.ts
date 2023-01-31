import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { CrendentialsService } from '../_services/crendentials.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private credentialsService: CrendentialsService,
    public router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    // 1° way: Observable
    return this.credentialsService.userCredentials$.pipe(
      map((user) => {
        console.log(user);
        if (user) {
          return true;
        }
        this.router.navigate(['/auth']);
        return false;
      })
    );

    //2° way: localStarage
    /*if (localStorage.getItem('user')) {
      return true;
    }
    this.router.navigate(['/auth']);
    return false;*/
  }
}
