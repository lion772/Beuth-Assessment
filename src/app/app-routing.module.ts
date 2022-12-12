import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  { path: 'auth', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user-create', component: UserCreateComponent },
  { path: 'user-detail/:user', component: UserDetailComponent },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
