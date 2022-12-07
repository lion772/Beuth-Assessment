import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user-detail/:user', component: UserDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
