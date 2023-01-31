import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CrendentialsService } from 'src/app/_services/crendentials.service';
import { HttpService } from 'src/app/_services/http.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
})
export class UserCreateComponent implements OnInit {
  isUserLoggedIn = false;

  constructor(
    private httpService: HttpService,
    public credentialsService: CrendentialsService,
    public router: Router
  ) {}

  ngOnInit(): void {}

  onCreateHandler(createForm: NgForm) {
    console.log(createForm.value);
    this.httpService.postUserToFirebase(createForm.value);
  }
}
