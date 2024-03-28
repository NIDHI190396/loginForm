import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { UserListComponent } from './user-list/user-list.component';
import { LoginLayoutComponent } from './layout/login-layout/login-layout.component';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { CountryComponent } from './country/country/country.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { CountryPopupComponent } from './country/country-popup/country-popup.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { StateComponent } from './state/state.component';
import { StatePopupComponent } from './state/state-popup/state-popup.component';
import { MatSelectModule } from '@angular/material/select';
import { CityComponent } from './city/city.component';
import { CityPopupComponent } from './city/city-popup/city-popup.component';
import { DataService } from './country/country-data.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SideMenuComponent,
    UserListComponent,
    LoginLayoutComponent,
    HomeLayoutComponent,
    CountryComponent,
    CountryPopupComponent,
    StateComponent,
    StatePopupComponent,
    CityComponent,
    CityPopupComponent,

  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule
  ],
  providers: [AuthGuard, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
