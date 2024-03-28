import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent{
  isNaveBarShow: any;
  userRole:any;

  constructor(private router: Router) {
    this.isNaveBarShow = window.location.href.split('/')[3] == 'auth' ? false : true;
    this.toNavigate();
  }



  toNavigate() {
    const storedCredentials = localStorage.getItem('UserCredential');

    if (storedCredentials) {
      const user = JSON.parse(storedCredentials);
      this.userRole = user.Role;

      if (this.userRole === 'admin') {
        this.router.navigate(['/home/user-list']);
      } else if (this.userRole === 'user') {
        this.router.navigate(['/home']);
      }
    }
  }

}
