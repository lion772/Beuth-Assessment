import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CrendetialsService } from 'src/app/_services/crendetials.service';
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
    private credentialsService: CrendetialsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.isUserLoggedIn);
    this.credentialsService.isUserLoggedIn$.subscribe({
      next: (isLoggedin) => {
        if (isLoggedin) this.router.navigate(['/']);
        console.log(isLoggedin);
        this.isUserLoggedIn = isLoggedin;
      },
      error: (err) => console.log(err.message),
    });
  }

  onCreateHandler(createForm: NgForm) {
    console.log(createForm.value);
    this.httpService.postUserToFirebase(createForm.value);
  }
}