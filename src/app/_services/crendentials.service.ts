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
  private isUserLoggedInSource = new BehaviorSubject<boolean>(false);
  isUserLoggedIn$ = this.isUserLoggedInSource.asObservable();

  constructor(private http: HttpClient) {}

  signup(credentials: {
    email: string;
    password: string;
    returnSecureToken: boolean;
  }) {
    console.log(credentials);
    return this.http.post<User>(ENDPOINT_SIGNUP, credentials).subscribe({
      next: (userDetail: User) => {
        this.userCredentials = userDetail;
        localStorage.setItem('token', userDetail.idToken);
        this.checkUserLoggedIn();
        this.setCurrentUser(this.userCredentials);
      },
      error: (err) => err.message,
    });
  }

  signin(credentials: {
    email: string;
    password: string;
    returnSecureToken: boolean;
  }) {
    this.http.post<User>(ENDPOINT_SIGNIN, credentials).subscribe({
      next: (res: User) => {
        console.log(res);
        const { idToken, email } = res;
        this.userCredentials = { idToken, email };
        localStorage.setItem('token', idToken);
        this.checkUserLoggedIn();
        this.setCurrentUser(this.userCredentials);
      },
    });
  }

  checkUserLoggedIn() {
    const isLoggedin = localStorage.getItem('token') ? true : false;
    console.log(isLoggedin);
    this.isLoggedin = isLoggedin;
    this.isUserLoggedInSource.next(isLoggedin);
  }

  setCurrentUser(user: User | null = null) {
    this.userCredentialsSource.next(user);
  }

  logout() {
    localStorage.clear();
    this.setCurrentUser();
    this.checkUserLoggedIn();
  }

  public get hasToken() {
    return localStorage.getItem('token');
  }
}
