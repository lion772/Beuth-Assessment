import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { ENDPOINT_SIGNUP, ENDPOINT_SIGNIN } from '../secrets';
import { User } from '../models/User.dto';

@Injectable({
  providedIn: 'root',
})
export class CrendentialsService {
  private userCredentials!: User;
  isLoggedin = false;
  private userCredentialsSource = new BehaviorSubject<User | null>(null);
  userCredentials$ = this.userCredentialsSource.asObservable();
  private isUserLoggedIn = new BehaviorSubject<boolean>(false);
  isUserLoggedIn$ = this.isUserLoggedIn.asObservable();

  constructor(private http: HttpClient) {}

  signup(credentials: {
    email: string;
    password: string;
    returnSecureToken: boolean;
  }) {
    console.log(credentials);
    return this.http.post(ENDPOINT_SIGNUP, credentials).subscribe({
      next: (res: any) => {
        const { idToken, email } = res;
        this.userCredentials = { idToken, email };
        localStorage.setItem('token', idToken);
        this.checkUserLoggedIn();
        this.userCredentialsSource.next(this.userCredentials);
      },
      error: (err) => err.message,
    });
  }

  signin(credentials: {
    email: string;
    password: string;
    returnSecureToken: boolean;
  }) {
    this.http.post(ENDPOINT_SIGNIN, credentials).subscribe({
      next: (res: any) => {
        console.log(res);
        const { idToken, email } = res;
        this.userCredentials = { idToken, email };
        localStorage.setItem('token', idToken);
        this.checkUserLoggedIn();
        this.userCredentialsSource.next(this.userCredentials);
      },
    });
  }

  checkUserLoggedIn() {
    const isLoggedin = localStorage.getItem('token') ? true : false;
    this.isLoggedin = isLoggedin;
    this.isUserLoggedIn.next(isLoggedin);
  }

  logout() {
    localStorage.clear();
    this.checkUserLoggedIn();
  }
}
