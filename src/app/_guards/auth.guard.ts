import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CrendetialsService } from '../_services/crendetials.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private credentialsService: CrendetialsService,
    public router: Router
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.credentialsService.isLoggedin) {
      return true;
    }
    this.navigateHomePage();
    return false;
  }

  navigateHomePage() {
    console.log('You shall not pass!');
    this.router.navigate(['/']);
  }
}