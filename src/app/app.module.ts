import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { LogoComponent } from './components/logo/logo.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, UserDetailComponent, LogoComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
