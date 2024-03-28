import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { UserListComponent } from './user-list/user-list.component';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { LoginLayoutComponent } from './layout/login-layout/login-layout.component';
import { CountryComponent } from './country/country/country.component';
import { StateComponent } from './state/state.component';
import { CityComponent } from './city/city.component';

const routes: Routes = [
  {path: 'auth', component:LoginLayoutComponent,
  children: [
    {path:'',component: LoginComponent}
   ]},

  {path: '', component:HomeLayoutComponent, canActivate: [AuthGuard],
     children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {path:'home',component: HomeComponent},
      {path: 'user-list', component:UserListComponent},
      {path: 'country', component: CountryComponent},
      {path: 'state', component: StateComponent},
      {path: 'city', component: CityComponent}
     ]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
