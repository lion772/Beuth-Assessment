import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { UserInfo } from '../models/UserInfo.dto';
import { ENDPOINT } from '../secrets';
import { User } from '../models/User.dto';

@Injectable({
  providedIn: 'root',
})
export class CrendetialsService {
  private userCredentials!: User;
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
    this.http.post(ENDPOINT, credentials).subscribe({
      next: (res: any) => {
        const { idToken, email } = res;
        this.userCredentials = { idToken, email };
        localStorage.setItem('token', idToken);
        this.checkUserLoggedIn();
        this.userCredentialsSource.next(this.userCredentials);
      },
      error: (err) => console.log(err.message),
    });
  }

  checkUserLoggedIn() {
    const isLoggedIn = localStorage.getItem('token') ? true : false;
    this.isUserLoggedIn.next(isLoggedIn);
  }

  logout() {
    localStorage.clear();
    this.checkUserLoggedIn();
  }
}
