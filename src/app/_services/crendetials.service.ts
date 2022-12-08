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
  userCredentials!: User;
  private userCredentialsSource = new BehaviorSubject<User | null>(null);
  userCredentials$ = this.userCredentialsSource.asObservable();
  constructor(private http: HttpClient) {}

  signup(credentials: {
    email: string;
    password: string;
    returnSecureToken: boolean;
  }) {
    console.log(credentials);
    this.http.post(ENDPOINT, credentials).subscribe({
      next: (res: any) => {
        console.log(res);
        const { idToken, email } = res;
        this.userCredentials = { idToken, email };
        console.log('CREDENTIALS: ', idToken, email);
        localStorage.setItem('token', idToken);
        this.userCredentialsSource.next(this.userCredentials);
      },
      error: (err) => console.log(err.message),
    });
  }

  checkUserLoggedIn(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  logout(): boolean {
    localStorage.clear();
    return false;
  }
}

