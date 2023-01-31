import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CrendentialsService } from 'src/app/_services/crendentials.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  active = 1;
  userLoggedIn = false;
  signIn = true;
  error!: string;
  isSubmitted = false;

  constructor(
    public credentialsService: CrendentialsService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmitHandler(form: NgForm) {
    this.isSubmitted = true;
    if (!this.signIn) {
      const credentials = { ...form.value, returnSecureToken: true };
      this.credentialsService.signup(credentials);
    } else {
      const credentials = { ...form.value, returnSecureToken: true };
      this.credentialsService.signin(credentials);
    }
    this.router.navigate(['/login']);
  }

  onLogoutHandler() {
    this.credentialsService.logout();
    this.router.navigate(['/auth']);
  }

  onBeuthAppHandler() {
    this.userLoggedIn
      ? this.router.navigate(['/login'])
      : this.router.navigate(['/auth']);
  }
}
