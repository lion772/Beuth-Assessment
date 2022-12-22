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

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    /* if (this.credentialsService.isLoggedin) {
      return true;
    } */
    return this.credentialsService.isUserLoggedIn$.pipe(
      map((isLoggedin) => {
        if (!isLoggedin) {
          this.navigateHomePage();
          return false;
        }
        return true;
      })
    );
  }

  navigateHomePage() {
    console.log('You shall not pass!');
    this.router.navigate(['/auth']);
  }
}
