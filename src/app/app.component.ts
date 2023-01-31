import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrendentialsService } from './_services/crendentials.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private credentialsService: CrendentialsService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.credentialsService.checkUserLoggedIn();
    this.credentialsService.isUserLoggedIn$.subscribe({
      next: (isLoggedin) => {
        isLoggedin
          ? this.router.navigate(['/login'])
          : this.router.navigate(['/auth']);
      },
      error: (err) => console.log(err),
    });
  }
  title = 'beuth-app';
}
