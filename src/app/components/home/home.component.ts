import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../../_services/user-service.service';
import { UserInfo } from '../../models/UserInfo.dto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  title = '';
  subscription!: Subscription;
  users: UserInfo[] | null = [];

  constructor(private userService: UserService, private router: Router) {}

  public ngOnInit(): void {
    this.title = 'my new wondeful website';
    this.userService.getUsers();
    this.subscription = this.userService.users$.subscribe((data) => {
      data ? (this.users = data) : (this.users = null);
    });
    console.log(this.users);
  }

  onClickHandler = (user: UserInfo) => {
    this.router.navigate([`/user-detail/${user.username}`, user]);
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
