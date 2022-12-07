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
  defaultPicture = '../../../assets/no-profile-img.jpg';
  actualLevel: number = 1;
  userFound?: UserInfo | null;
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.params.subscribe((params) => {
      console.log('PARAMS: ', params);
      this.defaultPicture = params['picturePath'];
      this.userFound = params as UserInfo;
      this.actualLevel = params['userLevel'];
    });
  }
}
