import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { UserInfo } from '../models/UserInfo.dto';
import { FIREBASE_DOMAIN } from '../secrets';
console.log(FIREBASE_DOMAIN);

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private usersList: any[] = [];
  private usersInfoSource = new BehaviorSubject<UserInfo[] | null>(null);
  usersInfo$ = this.usersInfoSource.asObservable();
  constructor(private http: HttpClient) {}

  getUsersFromFirebase() {
    this.http
      .get(FIREBASE_DOMAIN)
      .pipe(
        map((dataToBeFiltered: any) => {
          let usersDb = [];
          for (const key in dataToBeFiltered) {
            usersDb.push(dataToBeFiltered[key]);
          }
          return usersDb;
        })
      )
      .subscribe({
        next: (userData) => {
          console.log(userData);
          this.usersList = userData;
          this.usersInfoSource.next([...this.usersList]);
        },
        error: (err) => console.log(err.message),
      });
  }
}
