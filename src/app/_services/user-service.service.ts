import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserInfo } from '../models/UserInfo.dto';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
  private users: UserInfo[] = [];
  private usersSource = new BehaviorSubject<UserInfo[] | null>(null);
  users$ = this.usersSource.asObservable();
  private _jsonURL = '/assets/data.json';

  constructor(private _http: HttpClient) {}

  // build component to display userdata
  getUsers() {
    this.getJSON().subscribe((data) => {
      this.users = data;
      this.usersSource.next([...data]);
    });
  }

  private getJSON(): Observable<UserInfo[]> {
    return this._http.get<UserInfo[]>(this._jsonURL);
  }
}
