import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CrendetialsService } from 'src/app/_services/crendetials.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  active = 1;
  constructor(private credentialsService: CrendetialsService) {}

  ngOnInit(): void {}

  onSubmitHandler(form: NgForm) {
    this.credentialsService.signup(form.value);
  }
}
