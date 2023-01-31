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

  constructor(private http: HttpClient) {}

  signup(credentials: {
    email: string;
    password: string;
    returnSecureToken: boolean;
  }) {
    console.log(credentials);
    return this.http.post<User>(ENDPOINT_SIGNUP, credentials).subscribe({
      next: (res: User) => {
        this.setLocalStorage(res);
        this.userCredentials = res;
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
        this.setLocalStorage(res);
        this.userCredentials = res;
        this.setCurrentUser(this.userCredentials);
      },
    });
  }

  setLocalStorage(response: User) {
    localStorage.setItem(
      'user',
      JSON.stringify({ email: response.email, idToken: response.idToken })
    );
  }

  setCurrentUser(user: User | null = null) {
    this.userCredentialsSource.next(user);
  }

  logout() {
    localStorage.clear();
    this.setCurrentUser();
  }
}
