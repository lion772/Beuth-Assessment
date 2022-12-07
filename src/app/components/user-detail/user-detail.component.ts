import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserInfo } from '../../models/UserInfo.dto';
import { UserService } from '../../_services/user-service.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  users: UserInfo[] = [];
  userFound?: UserInfo | null;
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.userFound = params as UserInfo;
    });
  }
}
