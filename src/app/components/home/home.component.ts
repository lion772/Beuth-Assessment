import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../../_services/user.service';
import { UserInfo } from '../../models/UserInfo.dto';
import { HttpService } from 'src/app/_services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  title = '';
  subscription!: Subscription;
  users: UserInfo[] | null = [];

  constructor(private httpService: HttpService, private router: Router) {}

  public ngOnInit(): void {
    this.title = 'my new humble website';

    //First way: Getting dummy data from user.service.ts:
    /* this.userService.getUsers();
    this.subscription = this.userService.users$.subscribe((data) => {
      data ? (this.users = data) : (this.users = null);
    }); */

    //Second way: Getting users from Firebase database:
    this.httpService.getUsersFromFirebase();
    this.subscription = this.httpService.usersInfo$.subscribe((usersData) => {
      if (usersData && usersData?.length > 0) {
        this.users = usersData;
      }
    });
  }

  onClickHandler = (user: UserInfo) => {
    console.log(user);
    this.router.navigate([`/user-detail/${user.username}`, user]);
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
